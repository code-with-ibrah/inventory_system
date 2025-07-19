<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\ProductQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\product\ProductRequest;
use App\Http\Requests\product\UpdateProductRequest;
use App\Http\Resources\product\ProductResource;
use App\Http\Resources\product\ProductResourceCollection; 
use App\Models\Product;
use App\Models\ProductSupplier;
use App\Models\Stock;
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
            return response()->json(["data" => $productList]);
        } else {
            return response()->json(["data" => []], 200);
        }
    }



    public function store(ProductRequest $request)
    {
        try{
            $product = DB::transaction(function () use ($request) {
                $request->quantity = $request->standardPackageQuantity;

                $payload = PrepareRequestPayload::prepare($request);
                $payload["costPrice"] = 0.0;

                if ($request->hasFile("image")) {
                    $imageUri = ImageUpload::init($request->file("image"));
                    $payload["image"] = $imageUri;
                }

                $product = Product::create($payload);
                $product->suppliers()->attach($request->supplierId);

                // create a new stock from the product to be created!
                $stockPayload = [
                    "productId" => $product->id,
                    "wareHouseId" => $request->wareHouseId,
                    "quantityOnHand" => $request->quantity,
                    "locationInWarehouse" => $request->locationInWarehouse ?? "",
                    "stockAlertLevel" => $request->stockAlertLevel,
                    "companyId" => $request->companyId,
                    "productName" => $product->name
                ];

                Stock::create($stockPayload);

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


    public function update(UpdateProductRequest $request, $id)
    {
        try{
            $product = DB::transaction(function () use ($request, $id) {
                $product = Product::findOrFail($id);
                $oldImagePath = $product->image;
                $payload = PrepareRequestPayload::prepare($request);
                $payload["costPrice"] = $product->costPrice;

                if($request->hasFile("image"))
                {
                    $imageUri = ImageUpload::init($request->file("image"));
                    $payload["image"] = $imageUri;
                    // Delete old image after new upload
                    ImageUpload::removePreviousImage($oldImagePath);
                }


                $product->update($payload);
                if($request->supplierId){
                    $product->suppliers()->sync([$request->supplierId]);
                }
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
