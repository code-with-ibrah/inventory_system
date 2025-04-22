<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\StockAdjustmentItemQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\stockAdjustmentItem\StockAdjustmentItemRequest;
use App\Http\Resources\stockAdjustmentItem\StockAdjustmentItemResource;
use App\Http\Resources\stockAdjustmentItem\StockAdjustmentItemResourceCollection;
use App\Models\Product;
use App\Models\Stock;
use App\Models\StockAdjustmentItem;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class StockAdjustmentItemController extends Controller
{
    protected $cachePrefix = "StockAdjustmentItem_";

    public function index(Request $request)
    {
        $filter = new StockAdjustmentItemQuery();
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
            return new StockAdjustmentItemResourceCollection(
                StockAdjustmentItem::where($queryItems)
                    ->with('product')
                    ->paginate($perPage)
            );
        });
    }


    public function store(StockAdjustmentItemRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);

        $existingProductToAdjusted = StockAdjustmentItem::where("productId", $request->productId)->first();
        if($existingProductToAdjusted){
            $payload["previousQuantity"] = $existingProductToAdjusted->quantityOnHand;
            $payload["newQuantity"] = ($request->adjustedQuantity) + $existingProductToAdjusted->quantityOnHand;
            $payload["unitCostAtAdjustment"] = $existingProductToAdjusted->product->unitPrice;
            $stockAdjustmentItem = StockAdjustmentItem::create($payload);

            // Clear relevant cache on create
            $this->clearCache($this->cachePrefix, $stockAdjustmentItem->id);
            return new StockAdjustmentItemResource($stockAdjustmentItem);
        }


        $stock = Stock::where("productId", $request->productId)->first();
        if($stock)
        {
            $payload["previousQuantity"] = $stock->quantityOnHand;
            $payload["newQuantity"] = ($request->adjustedQuantity) + $stock->quantityOnHand;
            $payload["unitCostAtAdjustment"] = $stock->product->unitPrice;
            $stockAdjustmentItem = StockAdjustmentItem::create($payload);
            // Clear relevant cache on create
            $this->clearCache($this->cachePrefix, $stockAdjustmentItem->id);
            return new StockAdjustmentItemResource($stockAdjustmentItem);
        }
        return ApiResponse::notFound("Product not found in stock!");
    }


    public function show(StockAdjustmentItem $stockAdjustmentItem)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $stockAdjustmentItem->id;
        return Cache::rememberForever($cacheKey, function () use ($stockAdjustmentItem) {
            return new StockAdjustmentItemResource($stockAdjustmentItem);
        });
    }


    public function update(StockAdjustmentItemRequest $request, $id)
    {
        $stockAdjustmentItem = StockAdjustmentItem::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $stockAdjustmentItem->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new StockAdjustmentItemResource($stockAdjustmentItem);
    }


    public function destroy(StockAdjustmentItem $stockAdjustmentItem, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");
        if($shouldDeletePermantely){
            $stockAdjustmentItem->delete();
        }
        else{
            $stockAdjustmentItem->isDeleted = true;
            $stockAdjustmentItem->save();
        }
        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $stockAdjustmentItem->id);
        return new StockAdjustmentItemResource($stockAdjustmentItem);
    }


    public function handleToggleAction($column, $id)
    {
        $stockAdjustmentItem= StockAdjustmentItem::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }
        $stockAdjustmentItem->{$column} = !$stockAdjustmentItem->{$column};
        $stockAdjustmentItem->save();
        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new StockAdjustmentItemResource($stockAdjustmentItem);
    }
}
