<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\PaymentMethodQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\payment_method\PaymentMethodRequest;
use App\Http\Resources\payment_method\PaymentMethodResource;
use App\Http\Resources\payment_method\PaymentMethodResourceCollection;
use App\Models\PaymentMethod;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PaymentMethodController extends Controller
{
    protected $cachePrefix = "paymentMethod_";

    public function index(Request $request)
    {
        $filter = new PaymentMethodQuery();
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
            return new PaymentMethodResourceCollection(PaymentMethod::where($queryItems)->paginate($perPage));
        });
    }


    public function store(PaymentMethodRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $paymentMethod = PaymentMethod::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $paymentMethod->id);
        return new PaymentMethodResource($paymentMethod);
    }


    public function show(PaymentMethod $paymentMethod)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $paymentMethod->id;
        return Cache::rememberForever($cacheKey, function () use ($paymentMethod) {
            return new PaymentMethodResource($paymentMethod);
        });
    }


    public function update(PaymentMethodRequest $request, $id)
    {
        $paymentMethod = PaymentMethod::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $paymentMethod->update($payload);

        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new PaymentMethodResource($paymentMethod);
    }


    public function destroy(PaymentMethod $paymentMethod, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");
        if($shouldDeletePermantely){
            $paymentMethod->delete();
        }
        else{
            $paymentMethod->isDeleted = true;
            $paymentMethod->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $paymentMethod->id);
        return new PaymentMethodResource($paymentMethod);
    }


    public function handleToggleAction($column, $id)
    {
        $paymentMethod = PaymentMethod::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $paymentMethod->{$column} = !$paymentMethod->{$column};
        $paymentMethod->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);
        return new PaymentMethodResource($paymentMethod);
    }
}
