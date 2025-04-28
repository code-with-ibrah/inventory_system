<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\StockAdjustmentQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\stockAdjustment\StockAdjustmentRequest;
use App\Http\Resources\stockAdjustment\StockAdjustmentResource;
use App\Http\Resources\stockAdjustment\StockAdjustmentResourceCollection;
use App\Models\Stock;
use App\Models\StockAdjustment;
use App\Models\StockAdjustmentItem;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class StockAdjustmentController extends Controller
{
    protected $cachePrefix = "StockAdjustment_";

    public function index(Request $request)
    {
        $filter = new StockAdjustmentQuery();
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
            return new StockAdjustmentResourceCollection(
                StockAdjustment::where($queryItems)
                    ->with('user')
                    ->paginate($perPage)
            );
        });
    }


    public function store(StockAdjustmentRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $StockAdjustment = StockAdjustment::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $StockAdjustment->id);
        return new StockAdjustmentResource($StockAdjustment);
    }


    public function show(StockAdjustment $StockAdjustment)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $StockAdjustment->id;
        return Cache::rememberForever($cacheKey, function () use ($StockAdjustment) {
            return new StockAdjustmentResource($StockAdjustment);
        });
    }


    public function update(StockAdjustmentRequest $request, $id)
    {
        $StockAdjustment = StockAdjustment::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $StockAdjustment->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new StockAdjustmentResource($StockAdjustment);
    }


    public function destroy(StockAdjustment $stockAdjustment, Request $request)
    {
        DB::transaction(function() use ($stockAdjustment){
            $stockAdjustmentItemList = StockAdjustmentItem::where("adjustmentId", $stockAdjustment->id)->get();

            foreach ($stockAdjustmentItemList as $adjustmentItem){
                if($stock = Stock::where("productId", $adjustmentItem->productId)->first()) {
                    $stock->quantityOnHand = $adjustmentItem->previousQuantity;
                    $stock->save();
                }
                $adjustmentItem->delete();
            }

            $stockAdjustment->delete();
        });

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $stockAdjustment->id);
        return new StockAdjustmentResource($stockAdjustment);
    }


    public function handleToggleAction($column, $id)
    {
        $StockAdjustment= StockAdjustment::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }
        $StockAdjustment->{$column} = !$StockAdjustment->{$column};
        $StockAdjustment->save();
        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new StockAdjustmentResource($StockAdjustment);
    }
}
