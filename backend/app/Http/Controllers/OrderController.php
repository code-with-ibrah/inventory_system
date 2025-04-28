<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\OrderQuery;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\order\OrderRequest;
use App\Http\Resources\order\OrderResource;
use App\Http\Resources\order\OrderResourceCollection;
use App\Models\Order;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class OrderController extends Controller
{
    protected $cachePrefix = "order_";

    public function index(Request $request)
    {
        $filter = new OrderQuery();
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
            return new OrderResourceCollection(
                Order::where($queryItems)
                    ->paginate($perPage)
            );
        });
    }


    public function store(OrderRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $order = Order::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $order->id);

        return new OrderResource($order);
    }


    public function show(Order $order)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $order->id;
        return Cache::rememberForever($cacheKey, function () use ($order) {
            return new OrderResource($order);
        });
    }


    public function update(OrderRequest $request, $id)
    {
        $order = Order::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $order->update($payload);

        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);

        return new OrderResource($order);
    }


    public function destroy(Order $order, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        if($shouldDeletePermantely){
            $order->delete();
        }
        else{
            $order->isDeleted = true;
            $order->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $order->id);

        return new OrderResource($order);
    }


    public function handleToggleAction($column, $id)
    {
        $order= Order::findOrFail($id); // Use findOrFail

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $order->{$column} = !$order->{$column};
        $order->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new OrderResource($order);
    }
}
