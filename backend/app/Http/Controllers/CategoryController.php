<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\CategoryQuery;
use App\Http\Requests\category\CategoryRequest;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Resources\category\CategoryResource;
use App\Http\Resources\category\CategoryResourceCollection;
use App\Http\Api\response\ApiResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Utils\Globals;

class CategoryController extends Controller
{
    protected $cachePrefix = "category_";

    public function index(Request $request)
    {
        $filter = new CategoryQuery();
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
            return new CategoryResourceCollection(Category::where($queryItems)->paginate($perPage));
        });
    }


    public function store(CategoryRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $category = Category::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $category->id);
        return new CategoryResource($category);
    }


    public function show(Category $category)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $category->id;
        return Cache::rememberForever($cacheKey, function () use ($category) {
            return new CategoryResource($category);
        });
    }


    public function update(CategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $category->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new CategoryResource($category);
    }


    public function destroy(Category $category)
    {
        $category->isDeleted = true;
        $category->save();

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $category->id);

        return new CategoryResource($category);
    }


    public function handleToggleAction($column, $id)
    {
        $category= Category::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }
        $category->{$column} = !$category->{$column};
        $category->save();
        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new CategoryResource($category);
    }
}
