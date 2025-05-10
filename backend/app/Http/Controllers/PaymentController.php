<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\PaymentQuery;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\payments\PaymentRequest;
use App\Http\Resources\payments\PaymentResource;
use App\Http\Resources\payments\PaymentResourceCollection;
use App\Models\Payment;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PaymentController extends Controller
{
    protected $cachePrefix = "payment_";

    public function index(Request $request)
    {
        $filter = new PaymentQuery();
        $queryItems = $filter->transform($request);
        $take = $request->query("take");
        $takeIsDefinedInUrl = ($take && intval($take) && $take > 0);
        $perPage = ($takeIsDefinedInUrl ? $take : Globals::getDefaultPaginationNumber());

        $cacheKey = $this->cachePrefix . 'index:' . md5(serialize([
                $queryItems,
                $perPage,
                $request->query('page', 1),
            ]));

        return Cache::remember($cacheKey, $this->cacheTtl, function () use ($queryItems, $perPage) {
            return new PaymentResourceCollection(
                Payment::where($queryItems)
                    ->with('customer')
                    ->order('date', 'desc')
                    ->paginate($perPage)
            );
        });
    }


    public function store(PaymentRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $payment = Payment::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $payment->id);
        return new PaymentResource($payment);
    }


    public function show(Payment $payment)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $payment->id;
        return Cache::rememberForever($cacheKey, function () use ($payment) {
            return new PaymentResource($payment);
        });
    }


    public function update(PaymentRequest $request, $id)
    {
        $payment = Payment::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $payment->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new PaymentResource($payment);
    }


    public function destroy(Payment $payment, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        if($shouldDeletePermantely){
            $payment->delete();
        }
        else{
            $payment->isDeleted = true;
            $payment->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $payment->id);

        return new PaymentResource($payment);
    }

}
