<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\StockAdjustmentItemQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\stockAdjustmentItem\StockAdjustmentItemRequest;
use App\Http\Requests\stockAdjustmentItem\UpdateStockAdjustmentItemRequest;
use App\Http\Resources\stockAdjustmentItem\StockAdjustmentItemResource;
use App\Http\Resources\stockAdjustmentItem\StockAdjustmentItemResourceCollection;
use App\Models\Product;
use App\Models\Stock;
use App\Models\StockAdjustmentItem;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
        $adjustmentsData = $request->all();
        $createdItems = collect();
        $updatedStocks = collect();

        try {
            $createdStockAdjustmentItems = DB::transaction(function () use ($adjustmentsData, &$createdItems, &$updatedStocks) {
                $productIds = collect($adjustmentsData)->pluck('productId')->unique()->toArray();
                $stocks = Stock::whereIn('productId', $productIds)->get()->keyBy('productId');

                foreach ($adjustmentsData as $adjustmentData) {
                    $productId = $adjustmentData['productId'];

                    if ($stocks->has($productId)) {
                        $stock = $stocks[$productId];
                        $payload = ($adjustmentData);

                        // Check if a StockAdjustmentItem with the same productId and adjustmentIdentifier already exists
                        if (StockAdjustmentItem::where('productId', $payload['productId'])
                            ->where('adjustmentId', $payload['adjustmentId'])
                            ->exists()) {
                            throw new \Exception("Stock Adjustment for one or more product already exists.");
                        }

                        $previousQuantity = $stock->quantityOnHand;
                        $adjustedQuantity = (int) $adjustmentData['adjustedQuantity'];
                        $newQuantity = $previousQuantity + $adjustedQuantity;
                        $unitCostAtAdjustment = $stock->product->unitPrice;
                        $associatedCost = abs($unitCostAtAdjustment * $adjustedQuantity);

                        $createdItems->push(new StockAdjustmentItem(array_merge($payload, [
                            'previousQuantity' => $previousQuantity,
                            'newQuantity' => $newQuantity,
                            'unitCostAtAdjustment' => $unitCostAtAdjustment,
                            'associatedCost' => $associatedCost
                        ])));

                        $stock->quantityOnHand = $newQuantity;
                        $updatedStocks->put($stock->id, $stock);
                    }
                }

                // Batch insert StockAdjustmentItems after processing all
                StockAdjustmentItem::insert($createdItems->toArray());

                // Batch update Stocks after processing all
                $updatedStocks->each(function ($stock) {
                    $stock->save();
                });

                return $createdItems;
            });

            return new StockAdjustmentItemResourceCollection($createdStockAdjustmentItems);

        } catch (\Exception $e) {
            return ApiResponse::duplicate($e->getMessage());
        }
    }



    public function show(StockAdjustmentItem $stockAdjustmentItem)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $stockAdjustmentItem->id;
        return Cache::rememberForever($cacheKey, function () use ($stockAdjustmentItem) {
            return new StockAdjustmentItemResource($stockAdjustmentItem);
        });
    }


    public function update(UpdateStockAdjustmentItemRequest $request, $id)
    {

        $stockAdjustmentItem = DB::transaction(function() use ($request, $id){
            $payload = PrepareRequestPayload::prepare($request);

            $stock = Stock::where("productId", $request->productId)->first();
            $stockAdjustmentItem = null;
            if($stock)
            {
                $stockAdjustmentItem = StockAdjustmentItem::findOrFail($id);

                $payload["previousQuantity"] = $stockAdjustmentItem->newQuantity;
                $payload["newQuantity"] = ((int)$request->adjustedQuantity) + (int)$stockAdjustmentItem->newQuantity;
                $payload["unitCostAtAdjustment"] = $stockAdjustmentItem->unitCostAtAdjustment;
                $stockAdjustmentItem->update($payload);

                $stock->quantityOnHand = $payload["newQuantity"];
                $stock->save();
            }

            return $stockAdjustmentItem;
        });

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $stockAdjustmentItem->id);
        return new StockAdjustmentItemResource($stockAdjustmentItem);
    }


    public function destroy(StockAdjustmentItem $stockAdjustmentItem, Request $request)
    {
        DB::transaction(function() use ($stockAdjustmentItem){

            $stock = Stock
                ::where("productId", $stockAdjustmentItem->productId)
                ->first();

            if($stock)
            {
                $stock->quantityOnHand = $stockAdjustmentItem->previousQuantity;
                $stock->save();
            }
            $stockAdjustmentItem->delete();

            return $stockAdjustmentItem;
        });

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
