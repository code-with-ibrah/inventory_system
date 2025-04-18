<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\StockUnitQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\stock_unit\StockUnitRequest;
use App\Http\Resources\stock_unit\StockUnitResource;
use App\Http\Resources\stock_unit\StockUnitResourceCollection;
use App\Models\StockUnit;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class StockUnitController extends Controller
{
    protected $cachePrefix = "stockUnit_";

    public function index(Request $request)
    {
        $filter = new StockUnitQuery();
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
            return new StockUnitResourceCollection(
                StockUnit::where($queryItems)
                    ->paginate($perPage)
            );
        });
    }


    public function store(StockUnitRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $stockUnit = StockUnit::create($payload);
        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $stockUnit->id);
        return new StockUnitResource($stockUnit);
    }


    public function show(StockUnit $stockUnit)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $stockUnit->id;
        return Cache::rememberForever($cacheKey, function () use ($stockUnit) {
            return new StockUnitResource($stockUnit);
        });
    }


    public function update(StockUnitRequest $request, $id)
    {
        $stockUnit = StockUnit::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $stockUnit->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new StockUnitResource($stockUnit);
    }


    public function destroy(StockUnit $stockUnit, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");
        if($shouldDeletePermantely){
            $stockUnit->delete();
        }
        else{
            $stockUnit->isDeleted = true;
            $stockUnit->save();
        }
        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $stockUnit->id);
        return new StockUnitResource($stockUnit);
    }


    public function handleToggleAction($column, $id)
    {
        $stockUnit= StockUnit::findOrFail($id);
        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }
        $stockUnit->{$column} = !$stockUnit->{$column};
        $stockUnit->save();
        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);
        return new StockUnitResource($stockUnit);
    }
}
