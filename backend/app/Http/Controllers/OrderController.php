<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\OrderQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\order\OrderRequest;
use App\Http\Resources\order\OrderResource;
use App\Http\Resources\order\OrderResourceCollection;
use App\Models\Order;
use App\Models\Stock;
use App\Utils\Globals;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

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
                $request->query('page', 1)
            ]));

        return Cache::remember($cacheKey, $this->cacheTtl, function () use ($queryItems, $perPage) {
            return new OrderResourceCollection(
                Order::where($queryItems)
                    ->with('user')
                    ->with('customer')
                    ->with('payments')
                    ->orderBy('date', 'desc')
                    ->paginate($perPage)
            );
        });
    }

    public function indexFilter(Request $request){
        $fromDate = $request->query("fromDate");
        $toDate = $request->query("toDate");
        $filter = $request->query("filter");

        if($filter){
            $orders = Order::where("isDeleted", 0)
                ->whereBetween('date', [$fromDate, $toDate])
                ->where("isActive", 1)
                ->with('user')
                ->with('customer')
                ->with('payments')
                ->orderBy('date', 'desc')
                ->paginate(Globals::getDefaultPaginationNumber());

            return new OrderResourceCollection($orders);
        }
        else{
            return $this->index($request);
        }
    }


    public function indexFilterForCustomers(Request $request){
        $fromDate = $request->query("fromDate");
        $toDate = $request->query("toDate");
        $customerId = $request->query("customerId");

        $orders = Order::where("isDeleted", 0)
            ->whereBetween('date', [$fromDate, $toDate])
            ->where("isActive", 1)
            ->where("customerId", $customerId)
            ->where("status", "delivered")
            ->with('user')
            ->with('customer')
            ->with('payments')
            ->orderBy('date', 'desc')
            ->get();

        return new OrderResourceCollection($orders);
    }


    public function indexFilterByPeriod(Request $request){
        $filterType = $request->query("filterType");

        $now = Carbon::now('Africa/Accra');

        $fromDate = $toDate = "";

        switch ($filterType) {
            case 'today':
                $fromDate = $now->copy()->startOfDay()->toDateString();
                $toDate = $now->copy()->endOfDay()->toDateString();
                break;
            case 'yesterday':
                $fromDate = $now->copy()->subDay()->startOfDay()->toDateString();
                $toDate = $now->copy()->subDay()->endOfDay()->toDateString();
                break;
            case 'last_2_days':
                $fromDate = $now->copy()->subDays(2)->startOfDay()->toDateString();
                $toDate = $now->copy()->endOfDay()->toDateString();
                break;
            case 'last_3_days':
                $fromDate = $now->copy()->subDays(3)->startOfDay()->toDateString();
                $toDate = $now->copy()->endOfDay()->toDateString();
                break;
            case 'last_4_days':
                $fromDate = $now->copy()->subDays(4)->startOfDay()->toDateString();
                $toDate = $now->copy()->endOfDay()->toDateString();
                break;
            case 'week':
                $fromDate = $now->copy()->startOfWeek()->toDateString();
                $toDate = $now->copy()->endOfWeek()->toDateString();
                break;
            case 'month':
                $fromDate = $now->copy()->startOfMonth()->toDateString();
                $toDate = $now->copy()->endOfMonth()->toDateString();
                break;
            case 'last_month':
                $fromDate = $now->copy()->subMonth()->startOfMonth()->toDateString();
                $toDate = $now->copy()->subMonth()->endOfMonth()->toDateString();
                break;
            case 'year':
                $fromDate = $now->copy()->startOfYear()->toDateString();
                $toDate = $now->copy()->endOfYear()->toDateString();
                break;
        }



        $orders = Order::where("isDeleted", 0)
            ->where("isActive", 1)
            ->whereBetween('date', [$fromDate, $toDate])
            ->with('user')
            ->with('customer')
            ->with('payments')
            ->orderBy('date', 'desc')
            ->paginate(Globals::getDefaultPaginationNumber());

        return new OrderResourceCollection($orders);
    }


    public function store(OrderRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $payload["originalPrice"] = $payload["amount"];
        $discountPercentage = doubleval($payload["discount"]);
        $actualAmount = doubleval($payload["amount"]);

        // Calculate the discount amount
        $discountAmount = ($discountPercentage / 100) * $actualAmount;
        $newAmount = $actualAmount - $discountAmount;
        $payload["amount"] = $newAmount;
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
        $order = Order::with('payments')->findOrFail($id);

        $payload = PrepareRequestPayload::prepare($request);
        $payload["originalPrice"] = $payload["amount"];
        $discountPercentage = doubleval($payload["discount"]);
        $actualAmount = doubleval($payload["amount"]);

        // Calculate the discount amount
        $discountAmount = ($discountPercentage / 100) * $actualAmount;
        $newAmount = $actualAmount - $discountAmount;
        $payload["amount"] = $newAmount;

        $order->update($payload);

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




    public function test(Request $request){
        return Order::with("payments","orderItems")->get(["id", "date"]);
    }


    public function updateOrderStatus(Request $request, $id)
    {
            $order = DB::transaction(function() use ($request, $id){
                $order = Order::with('payments', 'orderItems')->findOrFail($id);
                $order->status = $request->status;

                if($request->status == "delivered"){
                    // fetch all the order items (already loaded)
                    $orderItems = $order->orderItems;

                    // target all the order items
                    $orderTotalCost = 0;

                    // old implementation that allows negatives
//                    foreach ($orderItems as $orderItem) {
//                        $orderTotalCost += $orderItem->totalCost;
//
//                        // target the stock ID on the order items
//                        if ($stock = Stock::where("productId", $orderItem->productId)->firstOrFail()) {
//                            // reduce the quantity of the stock by what was purchased!
//                            $stock->quantityOnHand -= $orderItem->quantity;
//                            $stock->save();
//                        }
//                    }


                    // new implementation that prevents negatives
                    foreach ($orderItems as $orderItem) {
                        $orderTotalCost += $orderItem->totalCost;

                        if ($stock = Stock::where("productId", $orderItem->productId)->firstOrFail()) {

                            $currentQuantity = (float) $stock->quantityOnHand;
                            $deductQuantity = (float) $orderItem->quantity;

                            if ($currentQuantity < $deductQuantity) {
                                // Throw an exception if there isn't enough stock
                                throw new \Exception("Insufficient stock for product '{$orderItem->product->name}'. Available: {$currentQuantity}, Requested: {$deductQuantity}.");
                            }

                            // If stock is sufficient, proceed to reduce the quantity
                            $stock->quantityOnHand -= $deductQuantity;
                            $stock->save();
                        }
                    }


                    $discountAmount = ($order->discount / 100) * $orderTotalCost;
                    $order->amount = ($orderTotalCost - $discountAmount);
                    $order->originalPrice = $orderTotalCost;
                }
                $order->save();

                return $order;
            });


            $this->clearCache($this->cachePrefix, $id);
            return new OrderResource($order);
    }







}
