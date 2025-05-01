<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\GoodsReceiptItemQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\goods_receipt_item\GoodsReceiptItemRequest;
use App\Http\Requests\goods_receipt_item\UpdateGoodsReceiptItemRequest;
use App\Http\Resources\goods_receipt_item\GoodsReceiptItemResource;
use App\Http\Resources\goods_receipt_item\GoodsReceiptItemResourceCollection;
use App\Http\Resources\stockAdjustmentItem\StockAdjustmentItemResourceCollection;
use App\Models\GoodsReceiptItem;
use App\Models\Stock;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class GoodsReceiptItemController extends Controller
{
    protected $cachePrefix = "goodsReceiptItem_";

    public function index(Request $request)
    {
        $filter = new GoodsReceiptItemQuery();
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
            return new GoodsReceiptItemResourceCollection(
                GoodsReceiptItem::where($queryItems)
                    ->with('product')
                    ->paginate($perPage));
        });
    }

    public function store(GoodsReceiptItemRequest $request)
    {
        $goodsReceiptsData = $request->all();
        $createdItems = collect();
        $updatedStocks = collect();


        $createdGoodsReceiptItems = DB::transaction(function () use ($goodsReceiptsData, &$createdItems, &$updatedStocks) {
            $productIds = collect($goodsReceiptsData)->pluck('productId')->unique()->toArray();
            $allProductInStock = Stock::whereIn('productId', $productIds)->get()->keyBy('productId');

            foreach ($goodsReceiptsData as $goodsReceiptItem) {
                $productId = $goodsReceiptItem['productId'];

                if ($allProductInStock->has($productId)) {
                    $stock = $allProductInStock[$productId];
                    $payload = ($goodsReceiptItem);
                    $currentProductId = $payload["productId"];


                    // Check if a GoodsReceiptItem with the same productId and goodsReceiptId already exists
                    if (GoodsReceiptItem::where('productId', $productId)
                        ->where('goodsReceiptId', $payload['goodsReceiptId'])
                        ->exists()) {
                        return ApiResponse::duplicate("One or more of the products already exists");
                    }

                    $createdItems->push(new GoodsReceiptItem(array_merge($payload, [
                        'productId' => $currentProductId,
                        'quantityReceived' => $payload["quantityReceived"],
                        'unitCostAtAdjustment' => $stock->product->unitPrice,
                        'goodsReceiptId' => $payload['goodsReceiptId'],
                        'companyId' => $payload['companyId']
                    ])));

                    $updatedStocks->put($stock->id, $stock);
                }
            }

            // Batch insert StockAdjustmentItems after processing all
            GoodsReceiptItem::insert($createdItems->toArray());

            // Batch update Stocks after processing all
            $updatedStocks->each(function ($stock) {
                $stock->save();
            });

            return $createdItems;
        });

        // Clear relevant cache on create
        return new GoodsReceiptItemResourceCollection($createdGoodsReceiptItems);
    }


    public function show(GoodsReceiptItem $goodsReceiptItem)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $goodsReceiptItem->id;
        return Cache::rememberForever($cacheKey, function () use ($goodsReceiptItem) {
            return new GoodsReceiptItemResource($goodsReceiptItem);
        });
    }


    public function update(UpdateGoodsReceiptItemRequest $request, $id)
    {
        $goodsReceiptItem = GoodsReceiptItem::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);

        $existingGoodsReceiptItem = GoodsReceiptItem
            ::where("productId", $payload['productId'])
            ->where("goodsReceiptId", $payload["goodsReceiptId"])
            ->first();

        if($existingGoodsReceiptItem != null && ($existingGoodsReceiptItem->productId != $goodsReceiptItem->productId))
        {
            return ApiResponse::duplicate("This product already exists");
        }

        $goodsReceiptItem->update($payload);

        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new GoodsReceiptItemResource($goodsReceiptItem);
    }


    public function destroy(GoodsReceiptItem $goodsReceiptItem, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");
        if($shouldDeletePermantely){
            $goodsReceiptItem->delete();
        }
        else{
            $goodsReceiptItem->isDeleted = true;
            $goodsReceiptItem->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $goodsReceiptItem->id);
        return new GoodsReceiptItemResource($goodsReceiptItem);
    }


    public function handleToggleAction($column, $id)
    {
        $goodsReceiptItem = GoodsReceiptItem::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $goodsReceiptItem->{$column} = !$goodsReceiptItem->{$column};
        $goodsReceiptItem->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);
        return new GoodsReceiptItemResource($goodsReceiptItem);
    }
}
