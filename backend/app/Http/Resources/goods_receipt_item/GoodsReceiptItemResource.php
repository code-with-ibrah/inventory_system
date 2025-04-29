<?php

namespace App\Http\Resources\goods_receipt_item;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GoodsReceiptItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
          "id" => $this->id,
          "goodsReceiptId" => $this->goodsReceiptId,
          "productId" => $this->productId,
          "quantityReceived" => $this->quantityReceived,
          "unitPriceAtReceipt" => $this->unitPriceAtReceipt,
          "product" => $this->product ? [
              "id" => $this->product->id,
              "name" => $this->product->name
          ] : null,
        ];
    }
}
