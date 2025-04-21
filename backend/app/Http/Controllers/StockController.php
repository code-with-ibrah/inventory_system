<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Utils\Globals;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Http\Api\response\ApiResponse;
use App\Http\Api\query\models\StockQuery;
use App\Http\Requests\stock\StockRequest;
use App\Http\Resources\stock\StockResource;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Resources\stock\StockResourceCollection;

class StockController extends Controller
{

    protected $cachePrefix = "stock_";

    public function index(Request $request)
    {
        $filter = new StockQuery();
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
            return new StockResourceCollection(
                Stock::where($queryItems)
                    ->with("product")
                    ->with("warehouse")
                    ->paginate($perPage)
            );
        });
    }


    public function store(StockRequest $request)
    {
        $product = Product::findOrFail($request->productId);

        $payload = PrepareRequestPayload::prepare($request);
        $payload["productName"] = $product->name;
        $stock = Stock::create($payload);
        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $stock->id);
        return new StockResource($stock);
    }


    public function show(Stock $stock)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $stock->id;
        return Cache::rememberForever($cacheKey, function () use ($stock) {
            return new StockResource($stock);
        });
    }


    public function update(StockRequest $request, $id)
    {
        $stock = Stock::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $stock->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new StockResource($stock);
    }


    public function destroy(Stock $stock, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");
        if($shouldDeletePermantely){
            $stock->delete();
        }
        else{
            $stock->isDeleted = true;
            $stock->save();
        }
        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $stock->id);
        return new StockResource($stock);
    }


    public function handleToggleAction($column, $id)
    {
        $stock= Stock::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }
        $stock->{$column} = !$stock->{$column};
        $stock->save();
        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new StockResource($stock);
    }
}
