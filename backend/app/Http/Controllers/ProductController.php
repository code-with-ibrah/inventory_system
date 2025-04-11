<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\ProductQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\product\ProductRequest;
use App\Http\Resources\product\ProductResource;
use App\Http\Resources\product\ProductResourceCollection;
use App\Models\Product;
use App\Utils\Globals;
use App\Utils\ImageUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
 protected $cachePrefix = "product_";

    public function index(Request $request)
    {
        $filter = new ProductQuery();
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
            return new ProductResourceCollection(
                Product::where($queryItems)
                    ->with('brand')
                    ->with('company')
                    ->with('category')
//                    ->with('stockUnit')
                    ->paginate($perPage)
            );
        });
    }


    public function store(ProductRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        if($request->hasFile("image")){
            $imageUri = ImageUpload::init($request->file("image"));
            $payload["image"] = $imageUri;
        }
        $product = Product::create($payload);
        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $product->id);
        return new ProductResource($product);
    }


    public function show(Product $product)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $product->id;
        return Cache::rememberForever($cacheKey, function () use ($product) {
            return new ProductResource($product);
        });
    }


    public function update(ProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        $oldImagePath = $product->image;
        $payload = PrepareRequestPayload::prepare($request);

        if($request->hasFile("image"))
        {
            $imageUri = ImageUpload::init($request->file("image"));
            $payload["image"] = $imageUri;
            // Delete old image if a new one is uploaded
            ImageUpload::removePreviousImage($oldImagePath);
        }


        $product->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new ProductResource($product);
    }


    public function destroy(Product $product, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        if($shouldDeletePermantely){
            $product->delete();
        }
        else{
            $product->isDeleted = true;
            $product->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $product->id);

        return new ProductResource($product);
    }


    public function handleToggleAction($column, $id)
    {
        $product = Product::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $product->{$column} = !$product->{$column};
        $product->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new ProductResource($product);
    }
}
