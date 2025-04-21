<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\ProductQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\product\ProductRequest;
use App\Http\Resources\product\ProductResource;
use App\Http\Resources\product\ProductResourceCollection;
use App\Http\Resources\product_supplier\ProductSupplierResource;
use App\Models\Product;
use App\Models\ProductSupplier;
use App\Utils\Globals;
use App\Utils\ImageUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use function Carbon\map;

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
                    ->with('suppliers')
                    ->paginate($perPage)
            );
        });
    }


    public function suppliers($id){
        $supplierRecords = ProductSupplier::where("supplierId", $id)->get();

        if ($supplierRecords->isNotEmpty()) {
            $productList = [];
            foreach ($supplierRecords as $record) {
                $product = Product::find($record->productId);
                if ($product) {
                    $supplierProduct = new ProductResource($product);
                    $productList[] = $supplierProduct;
                }
            }
            return response()->json($productList);
        } else {
            return response()->json(["data" => []], 200);
        }
    }

    public function store(ProductRequest $request)
    {
        try{
            $product = DB::transaction(function () use ($request) {
                $payload = PrepareRequestPayload::prepare($request);
                if ($request->hasFile("image")) {
                    $imageUri = ImageUpload::init($request->file("image"));
                    $payload["image"] = $imageUri;
                }
                $product = Product::create($payload);
                $product->suppliers()->attach($request->supplierId);
                return $product;
            });
            // Clear relevant cache on create
            $this->clearCache($this->cachePrefix, $product->id);
            return new ProductResource($product);
        }
        catch (\Exception $e){
            return ApiResponse::badRequest($e->getMessage());
        }
    }


    public function show(Product $product)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $product->id;
        return Cache::rememberForever($cacheKey, function () use ($product) {
            return new ProductResource(
                $product
                    ->with('brand')
                    ->with('company')
                    ->with('category')
                    ->with('suppliers')
                    ->with('stockUnit')
            );
        });
    }


    public function update(ProductRequest $request, $id)
    {
        try{
            $product = DB::transaction(function () use ($request, $id) {
                $product = Product::findOrFail($id);
                $oldImagePath = $product->image;
                $payload = PrepareRequestPayload::prepare($request);

                if($request->hasFile("image"))
                {
                    $imageUri = ImageUpload::init($request->file("image"));
                    $payload["image"] = $imageUri;
                    // Delete old image after new upload
                    ImageUpload::removePreviousImage($oldImagePath);
                }
                $product->update($payload);
                $product->suppliers()->sync([$request->supplierId]);
                return $product;
            });

            // Clear relevant cache on create
            $this->clearCache($this->cachePrefix, $product->id);
            return new ProductResource($product);
        }
        catch (\Exception $e){
            return ApiResponse::badRequest($e->getMessage());
        }
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
