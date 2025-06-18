<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\GoodsReceiptQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\goods_receipt\GoodsReceiptRequest;
use App\Http\Requests\goods_receipt\UpdateGoodsReceiptRequest;
use App\Http\Resources\goods_receipt\GoodsReceiptResource;
use App\Http\Resources\goods_receipt\GoodsReceiptResourceCollection;
use App\Models\GoodsReceipt;
use App\Models\Stock;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class GoodsReceiptController extends Controller
{
    protected $cachePrefix = "goodsReceipt_";

    public function index(Request $request)
    {
        $filter = new GoodsReceiptQuery();
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
            return new GoodsReceiptResourceCollection(
                GoodsReceipt::where($queryItems)
                    ->with('goodsReceiptItems')
                    ->with('user')
                    ->with('supplier')
                    ->orderBy('date', 'desc')
                    ->paginate($perPage)
            );
        });
    }

    public function store(GoodsReceiptRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $goodsReceipt = GoodsReceipt::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $goodsReceipt->id);
        return new GoodsReceiptResource($goodsReceipt);
    }


    public function show(GoodsReceipt $goodsReceipt)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $goodsReceipt->id;
        return Cache::rememberForever($cacheKey, function () use ($goodsReceipt) {
            return new GoodsReceiptResource($goodsReceipt);
        });
    }


    public function update(UpdateGoodsReceiptRequest $request, $id)
    {
        $goodsReceipt = GoodsReceipt::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        unset($payload["receiptNumber"]);
        $goodsReceipt->update($payload);

        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new GoodsReceiptResource($goodsReceipt);
    }


    public function destroy(GoodsReceipt $goodsReceipt, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");
        if ($shouldDeletePermantely) {
            $goodsReceipt->delete();
        } else {
            $goodsReceipt->isDeleted = true;
            $goodsReceipt->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $goodsReceipt->id);
        return new GoodsReceiptResource($goodsReceipt);
    }


    public function handleToggleAction($column, $id)
    {
        $goodsReceipt = GoodsReceipt::findOrFail($id);
        array_push($this->toggleColumn, "isRecorded");

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $goodsReceipt->{$column} = !$goodsReceipt->{$column};
        $goodsReceipt->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);
        return new GoodsReceiptResource($goodsReceipt);
    }


    public function markGoodsReceiptAsCompleted($id)
    {
        $goodsReceipt = DB::transaction(function () use ($id) {
            $goodsReceipt = GoodsReceipt::with('goodsReceiptItems')->findOrFail($id);
            foreach ($goodsReceipt->goodsReceiptItems as $item) {
                if($stock = Stock::where('productId', $item->productId)->first()){
                    $stock->update(['quantityOnHand' => $stock->quantityOnHand + $item->quantityReceived]);
                }
            }
            $goodsReceipt->isRecorded = true;
            $goodsReceipt->save();
            return $goodsReceipt;
        });


        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);
        return new GoodsReceiptResource($goodsReceipt);
    }


    public function indexFilterForSupplier(Request $request){
        $fromDate = $request->query("fromDate");
        $toDate = $request->query("toDate");
        $supplierId = $request->query("supplierId");

        $orders = GoodsReceipt::where("isDeleted", 0)
            ->with('goodsReceiptItems')
            ->whereBetween('date', [$fromDate, $toDate])
            ->where("supplierId", $supplierId)
            ->where("isActive", 1)
            ->orderBy('date', 'desc')
            ->get();


        return new GoodsReceiptResourceCollection($orders);
    }


}
