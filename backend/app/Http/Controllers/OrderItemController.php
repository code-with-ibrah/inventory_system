<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\OrderItemQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\order_item\OrderItemRequest;
use App\Http\Requests\order_item\UpdateOrderItemRequest;
use App\Http\Resources\order\OrderResource;
use App\Http\Resources\order_item\OrderItemResource;
use App\Http\Resources\order_item\OrderItemResourceCollection;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Stock;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class OrderItemController extends Controller
{
    protected $cachePrefix = "orderItem_";

    public function index(Request $request)
    {
        $filter = new OrderItemQuery();
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
            return new OrderItemResourceCollection(
                OrderItem::where($queryItems)
                    ->with('product')
                    ->paginate($perPage));
        });
    }

    public function store(OrderItemRequest $request)
    {
        $orderItemData = $request->all();
        $createdItems = collect();
        $updatedStocks = collect();

        $orderIdFromFirstItem = -5;
        if (!empty($orderItemData) && is_array($orderItemData[0]) && isset($orderItemData[0]['orderId'])) {
            $orderIdFromFirstItem = $orderItemData[0]['orderId'];
        }
        else{
            return ApiResponse::badRequest("Order id not found on the first product");
        }

        try {

            $targetOrder = DB::transaction(function () use ($orderItemData, &$createdItems, &$updatedStocks, &$orderIdFromFirstItem) {
                $targetOrder = new Order();
                if($orderIdFromFirstItem > 0){
                    $targetOrder = Order::findOrFail($orderIdFromFirstItem);
                }


                $productIds = collect($orderItemData)->pluck('productId')->unique()->toArray();
                $allProductInStock = Stock::whereIn('productId', $productIds)->get()->keyBy('productId');

                $totalCostForAllProducts = 0;
                foreach ($orderItemData as $orderItem) {
                    $productId = $orderItem['productId'];

                    if ($allProductInStock->has($productId)) {
                        $stock = $allProductInStock[$productId];
                        $payload = ($orderItem);
                        $currentProductId = $payload["productId"];

                        // Check if a oderItem with the same productId and orderId already exists
                        if (OrderItem::where('productId', $payload['productId'])
                            ->where('orderId', $payload['orderId'])
                            ->exists()) {
                            throw new \Exception("One or more of the product already exists in the order");
                        }

                        $product = Product::findOrFail($payload['productId']);

                        // check if stocks can serve the qty demanded
                        if($targetStock = Stock::where("productId", $productId)->first()){
                            $quantityBeforeDeduction = $targetStock->quantityOnHand;
                            $quantityAfterDeduction = (int) $targetStock->quantityOnHand  -= (int) $orderItem["quantity"];

                            if($quantityAfterDeduction < 0){
                                // throw new \Exception("The product '$product->name' currently has a stock level of '$targetStock->quantityOnHand' units. Please verify the requested quantity and try again.");
                                $requestedQty = $orderItem["quantity"];
                                throw new \Exception("You are buying more than the available quantity for '$product->name'. You requested for '$requestedQty' and the Available stock is '$quantityBeforeDeduction' ");
                            }

                        }
                        else{
                            throw new \Exception("$product->name is not found in stocks, verify and re-try");
                        }





                        $unitPrice = $payload["unitPriceAtSale"] ?? $product->unitPrice;
                        $totalCost = doubleval($payload['quantity']) * $unitPrice;

                        $createdItems->push(new OrderItem(array_merge($payload, [
                            'productId' => $currentProductId,
                            'quantity' => $payload["quantity"],
                            'unitPriceAtSale' => $unitPrice,
                            'totalCost' => doubleval($payload['quantity']) * $unitPrice,
                            'orderId' => $payload['orderId'],
                        ])));

                        $totalCostForAllProducts += $totalCost;

                        $updatedStocks->put($stock->id, $stock);
                    }
                }

                // add the total cost to products
                $targetOrder->amount += $totalCostForAllProducts;
                $targetOrder->save();

                // Batch insert OrderItems after processing all
                OrderItem::insert($createdItems->toArray());

                // Batch update Stocks after processing all
                $updatedStocks->each(function ($stock) {
                    $stock->save();
                });

                return $targetOrder;
            });

            // Clear relevant cache on create
            return new OrderResource($targetOrder);

        } catch (\Exception $e) {
            return ApiResponse::duplicate($e->getMessage());
        }
    }


    public function show(OrderItem $orderItem)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $orderItem->id;
        return Cache::rememberForever($cacheKey, function () use ($orderItem) {
            return new OrderItemResource($orderItem);
        });
    }


    public function update(UpdateOrderItemRequest $request, $id)
    {
        $orderItem = OrderItem::with('product')->findOrFail($id);
        $productStock = Stock::where("productId", $orderItem->product->id)->first();
        $payload = PrepareRequestPayload::prepare($request);

        $newQuantity = $request->quantity;
        $existingQuantity = $productStock->quantityOnHand;

        if($newQuantity > $existingQuantity){
            return ApiResponse::general("Quantity is more than the available. Requested: $newQuantity, Available: $existingQuantity", 400);
        }

        $existingOrderItem = OrderItem
            ::where("productId", $payload['productId'])
            ->where("orderId", $payload["orderId"])
            ->first();

        $unitPrice = $payload["unitPriceAtSale"] ?? $existingOrderItem->unitPriceAtSale;
        if($existingOrderItem != null && ($existingOrderItem->productId != $orderItem->productId))
        {
            return ApiResponse::duplicate("This product already exists");
        }
        $payload["unitPriceAtSale"] = $unitPrice;
        $payload["totalCost"] = $unitPrice * $payload["quantity"];

        $order = Order::findOrFail($orderItem->orderId);
        $order->amount -= $orderItem->totalCost;
        $order->amount += doubleval($payload["totalCost"]);
        $order->save();

        $orderItem->update($payload);

        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);

        return new OrderResource($order);
        // return new OrderItemResource($orderItem);
    }



    public function destroy(OrderItem $orderItem, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        $order = DB::transaction(function() use (&$orderItem, $shouldDeletePermantely){
            $order = Order::findOrFail($orderItem->orderId);
            $order->amount -= doubleval($orderItem->totalCost);
            $order->save();

            if($shouldDeletePermantely){
                $orderItem->delete();
            }
            else {
                $orderItem->isDeleted = true;
                $orderItem->save();
            }

            return $order;
        });

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $orderItem->id);
        return new OrderResource($order);
    }


    public function handleToggleAction($column, $id)
    {
        $orderItem = OrderItem::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $orderItem->{$column} = !$orderItem->{$column};
        $orderItem->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);
        return new OrderItemResource($orderItem);
    }
}
