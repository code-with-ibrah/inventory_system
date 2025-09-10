<?php

namespace App\Http\Resources\product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use function Laravel\Prompts\map;

class ProductWithTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $category = $this->category;
        $brand = $this->brand;
        $stockUnit = $this->stockUnit;
        $suppliers = $this->suppliers;

        return [
            "id" => $this->id,
            "actualName" => $this->name,
            "name" => $this->name . " ($stockUnit->name)",
            "sku" => $this->sku,
            "costPrice" => $this->costPrice,
            "unitPrice" => $this->unitPrice,
            "quantity" => $this->quantity,
            "stockAlertLevel" => $this->stockAlertLevel,
            "brandId" => $this->brandId,
            "site" => $this->site,
            "brandName" => $brand ? $brand->name : null,
            "stockUnitName" => $stockUnit ? $stockUnit->name : null,
            "stockUnit" => $this->stockUnit,
        ];
    }
}
