<?php

namespace App\Http\Resources\stock;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        $product = $this->product;

        return[
            "id" => $this->id,
            "productId" => $this->productId,
            "quantityOnHand" => $this->quantityOnHand,
            "stockAlertLevel" => $this->stockAlertLevel,
            "locationInWarehouse" => $this->locationInWarehouse,
            "lastStockCheckDate" => $this->lastStockCheckDate,
            "companyId" => $this->companyId,
            "warehouseId" => $this->wareHouseId,
            "warehouse" => $this->warehouse->name,
            "product" => $product ?
              [
                "id" => $product->id,
                "name" => $product->name,
                "unitPrice" => $product->unitPrice,
                "costPrice" => $product->costPrice
            ] : null,
            "isActive" => $this->isActive,
            "isDeleted" => $this->isDeleted
        ];
    }
}
