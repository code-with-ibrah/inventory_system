<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\CurrencyQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\currency\CurrencyRequest;
use App\Http\Resources\currency\CurrencyResource;
use App\Http\Resources\currency\CurrencyResourceCollection;
use App\Models\Currency;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CurrencyController extends Controller
{
    protected $cachePrefix = "currency_";

    public function index(Request $request)
    {
        $filter = new CurrencyQuery();
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
            return new CurrencyResourceCollection(Currency::where($queryItems)->paginate($perPage));
        });
    }


    public function store(CurrencyRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $currency = Currency::create($payload);
        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $currency->id);
        return new CurrencyResource($currency);
    }


    public function show(Currency $currency)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $currency->id;
        return Cache::rememberForever($cacheKey, function () use ($currency) {
            return new CurrencyResource($currency);
        });
    }


    public function update(CurrencyRequest $request, $id)
    {
        $currency = Currency::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $currency->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new CurrencyResource($currency);
    }


    public function destroy(Currency $currency, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        if($shouldDeletePermantely){
            $currency->delete();
        }
        else{
            $currency->isDeleted = true;
            $currency->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $currency->id);

        return new CurrencyResource($currency);
    }


    public function handleToggleAction($column, $id)
    {
        $currency = Currency::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $currency->{$column} = !$currency->{$column};
        $currency->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new CurrencyResource($currency);
    }
}
