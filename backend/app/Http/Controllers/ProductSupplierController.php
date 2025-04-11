<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\ProductSupplierQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\product_supplier\ProductSupplierRequest;
use App\Http\Resources\product_supplier\ProductSupplierResource;
use App\Http\Resources\product_supplier\ProductSupplierResourceCollection;
use App\Models\ProductSupplier;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductSupplierController extends Controller
{
    protected $cachePrefix = "productSupplier_";

    public function index(Request $request)
    {
        $filter = new ProductSupplierQuery();
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
            return new ProductSupplierResourceCollection(
                ProductSupplier::where($queryItems)
                    ->with('productList')
                    ->with('supplierList')
                    ->paginate($perPage)
            );
        });
    }


    public function store(ProductSupplierRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $ProductSupplier = ProductSupplier::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $ProductSupplier->id);
        return new ProductSupplierResource($ProductSupplier);
    }


    public function show(ProductSupplier $ProductSupplier)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $ProductSupplier->id;
        return Cache::rememberForever($cacheKey, function () use ($ProductSupplier) {
            return new ProductSupplierResource($ProductSupplier);
        });
    }


    public function update(ProductSupplierRequest $request, $id)
    {
        $ProductSupplier = ProductSupplier::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $ProductSupplier->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new ProductSupplierResource($ProductSupplier);
    }


    public function destroy(ProductSupplier $ProductSupplier, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        if($shouldDeletePermantely){
            $ProductSupplier->delete();
        }
        else{
            $ProductSupplier->isDeleted = true;
            $ProductSupplier->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $ProductSupplier->id);

        return new ProductSupplierResource($ProductSupplier);
    }


    public function handleToggleAction($column, $id)
    {
        $ProductSupplier= ProductSupplier::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }
        $ProductSupplier->{$column} = !$ProductSupplier->{$column};
        $ProductSupplier->save();
        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new ProductSupplierResource($ProductSupplier);
    }
}
