<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\SupplierQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\supplier\SupplierRequest;
use App\Http\Resources\supplier\SupplierResource;
use App\Http\Resources\supplier\SupplierResourceCollection;
use App\Models\Supplier;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SupplierController extends Controller
{
    protected $cachePrefix = "supplier_";

    public function index(Request $request)
    {
        $filter = new SupplierQuery();
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
            return new SupplierResourceCollection(Supplier::where($queryItems)->paginate($perPage));
        });
    }


    public function store(SupplierRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $supplier = Supplier::create($payload);
        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $supplier->id);
        return new SupplierResource($supplier);
    }


    public function show(Supplier $supplier)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $supplier->id;
        return Cache::rememberForever($cacheKey, function () use ($supplier) {
            return new SupplierResource($supplier);
        });
    }


    public function update(SupplierRequest $request, $id)
    {
        $supplier = Supplier::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $supplier->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new SupplierResource($supplier);
    }


    public function destroy(Supplier $supplier, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        if($shouldDeletePermantely){
            $supplier->delete();
        }
        else{
            $supplier->isDeleted = true;
            $supplier->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $supplier->id);

        return new SupplierResource($supplier);
    }


    public function handleToggleAction($column, $id)
    {
        $supplier = Supplier::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $supplier->{$column} = !$supplier->{$column};
        $supplier->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new SupplierResource($supplier);
    }
}
