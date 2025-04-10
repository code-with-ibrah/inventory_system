<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\BrandQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\brand\BrandRequest;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Resources\brand\BrandResource;
use App\Http\Resources\brand\BrandResourceCollection;
use App\Models\Brand;
use App\Utils\Globals;
use App\Utils\ImageUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BrandController extends Controller
{
    protected $cachePrefix = "brand_";

    public function index(Request $request)
    {
        $filter = new BrandQuery();
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
            return new BrandResourceCollection(
                Brand::where($queryItems)
                    ->with('children')
                    ->with('parent')
                    ->with('company')
                    ->paginate($perPage)
            );
        });
    }


    public function store(BrandRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        if($request->hasFile("logo")){
            $imageUri = ImageUpload::init($request->file("logo"));
            $payload["logo"] = $imageUri;
        }
        $brand = Brand::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $brand->id);

        return new BrandResource($brand);
    }


    public function show(Brand $brand)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $brand->id;
        return Cache::rememberForever($cacheKey, function () use ($brand) {
            return new BrandResource($brand);
        });
    }


    public function update(BrandRequest $request, $id)
    {
        $brand = Brand::findOrFail($id);

        $oldImagePath = $brand->logo;
        $payload = PrepareRequestPayload::prepare($request);

        if($request->hasFile("logo"))
        {
            $imageUri = ImageUpload::init($request->file("logo"));
            $payload["logo"] = $imageUri;
            // Delete old image if a new one is uploaded
            ImageUpload::removePreviousImage($oldImagePath);
        }

        $brand->update($payload);

        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);

        return new BrandResource($brand);
    }


    public function destroy(Brand $brand, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        if($shouldDeletePermantely){
            $brand->delete();
        }
        else{
            $brand->isDeleted = true;
            $brand->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $brand->id);

        return new BrandResource($brand);
    }


    public function handleToggleAction($column, $id)
    {
        $brand= Brand::findOrFail($id); // Use findOrFail

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $brand->{$column} = !$brand->{$column};
        $brand->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new BrandResource($brand);
    }
}
