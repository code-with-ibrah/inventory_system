<?php

namespace App\Http\Resources\goods_receipt;

use App\Http\Resources\supplier\SupplierResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GoodsReceiptResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "date" => $this->date,
            "totalAmount" => $this->totalAmount,
            "conditionOfGoods" => $this->conditionOfGoods,
            "receiptNumber" => $this->receiptNumber,
            "userId" => $this->userId,
            "user" => $this->user ?
                [
                    "id" => $this->user->id,
                    "name" => $this->user->name
                ] : null,
            "supplierId" => $this->supplierId,
            "supplier" => $this->supplier ? new SupplierResource($this->supplier) : null,
            "isActive" => $this->isActive,
            "isDeleted" => $this->isDeleted,
            "isRecorded" => $this->isRecorded,
            "updatedAt" => $this->updated_at,
            "items" => $this->whenLoaded('goodsReceiptItems', function ($goodsReceiptItemsCollection) {
                return $goodsReceiptItemsCollection->map(function ($item) {
                    return [
                        "id" => $item->id,
                        "name" => $item->product->name,
                        "quantity" => $item->quantityReceived,
                        "unitPrice" => $item->unitPriceAtReceipt
                    ];
                });
            }, [])
        ];
    }
}
