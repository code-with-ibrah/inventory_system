<?php

namespace App\Http\Resources\order_item;

use App\Http\Resources\product\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "orderId" => $this->orderId,
            "productId" => $this->productId,
            "quantity" => $this->quantity,
            "unitPriceAtSale" => $this->unitPriceAtSale,
            "totalCost" => $this->totalCost,
            "product" => $this->whenLoaded('product', function ($product){
                return new ProductResource($product);
            })
        ];
    }
}
