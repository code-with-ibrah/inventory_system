<?php

namespace App\Http\Controllers;

use App\Http\Resources\warehouse\WarehouseResourceCollection;
use App\Utils\Globals;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Http\Api\query\models\WarehouseQuery;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\warehouse\UpdateWarehouseRequest;
use App\Http\Requests\warehouse\WarehouseRequest;
use App\Http\Resources\warehouse\WarehouseResource;

class WarehouseController extends Controller
{
    protected $cachePrefix = "warehouse_";

    public function index(Request $request)
    {
        $filter = new WarehouseQuery();
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
            return new WarehouseResourceCollection(
                Warehouse::where($queryItems)
                    ->with('creator')
                    ->with('lastEditor')
                    ->paginate($perPage)
            );
        });
    }


    public function store(WarehouseRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
         $warehouse = Warehouse::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix,  $warehouse->id);
        return new WarehouseResource( $warehouse);
    }


    public function show(Warehouse  $warehouse)
    {
        $cacheKey = $this->cachePrefix . 'show:' .  $warehouse->id;
        return Cache::rememberForever($cacheKey, function () use ( $warehouse) {
            return new WarehouseResource( $warehouse);
        });
    }


    public function update(UpdateWarehouseRequest $request, $id)
    {
         $warehouse = Warehouse::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
         $warehouse->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new WarehouseResource( $warehouse);
    }


    public function destroy(Warehouse  $warehouse, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");
        if($shouldDeletePermantely){
              $warehouse->delete();
        }
        else{
             $warehouse->isDeleted = true;
             $warehouse->save();
        }
        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix,  $warehouse->id);
        return new WarehouseResource( $warehouse);
    }


    public function handleToggleAction($column, $id)
    {
         $warehouse= Warehouse::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }
         $warehouse->{$column} = ! $warehouse->{$column};
         $warehouse->save();
        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new WarehouseResource($warehouse);
    }
}
