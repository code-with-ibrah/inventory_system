<?php


namespace App\Http\Controllers;

use App\Http\Api\query\models\GoodsReceiptPaymentQuery;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\goods_receitp_payments\GoodsReceiptPaymentRequest;
use App\Http\Requests\payments\PaymentRequest;
use App\Http\Resources\goods_receitp_payments\GoodsReceiptPaymentResource;
use App\Http\Resources\goods_receitp_payments\GoodsReceiptPaymentResourceCollection;
use App\Models\GoodsReceipt;
use App\Models\GoodsReceiptPayments;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;


class GoodsReceiptPaymentsController extends Controller
{
    protected $cachePrefix = "goods_receipt_payment_";

    public function index(Request $request)
    {
        $filter = new GoodsReceiptPaymentQuery();
        $queryItems = $filter->transform($request);
        $take = $request->query("take");
        $takeIsDefinedInUrl = ($take && intval($take) && $take > 0);
        $perPage = ($takeIsDefinedInUrl ? $take : Globals::getDefaultPaginationNumber());

        $cacheKey = $this->cachePrefix . 'index:' . md5(serialize([
                $queryItems,
                $perPage,
                $request->query('page', Globals::getDefaultPaginationNumber()),
            ]));

        return Cache::remember($cacheKey, $this->cacheTtl, function () use ($queryItems, $perPage) {
            return new GoodsReceiptPaymentResourceCollection(
                GoodsReceiptPayments::where($queryItems)
                    ->with('supplier')
                    ->orderBy('date', 'desc')
                    ->paginate($perPage)
            );
        });
    }



    public function store(GoodsReceiptPaymentRequest $request)
    {
        $payment = GoodsReceiptPayments::create($request->all());
        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $payment->id);
        return new GoodsReceiptPaymentResource($payment);
    }


    public function show(GoodsReceiptPayments $payment)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $payment->id;
        return Cache::rememberForever($cacheKey, function () use ($payment) {
            return new GoodsReceiptPaymentResource($payment);
        });
    }


    public function update(PaymentRequest $request, $id)
    {
        $payment = GoodsReceiptPayments::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $payment->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new GoodsReceiptPaymentResource($payment);
    }


    public function destroy(GoodsReceiptPayments $payment, Request $request)
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
        return new GoodsReceiptPaymentResource($payment);
    }



    public function totalPayments($supplierId){
        $totalPayments = GoodsReceiptPayments::where("supplierId", $supplierId)->sum("amount");
        $totalGoodsReceipt = GoodsReceipt::where("supplierId", $supplierId)->sum("totalAmount");

        return response()->json([
            "data" => [
                "totalPayments" => $totalPayments,
                "totalGoodsReceipts" => $totalGoodsReceipt,
                "remaining" => doubleval($totalGoodsReceipt) - doubleval($totalPayments),
                "hasPaidMore" => ($totalPayments > $totalGoodsReceipt)
            ]
        ]);
    }


}
