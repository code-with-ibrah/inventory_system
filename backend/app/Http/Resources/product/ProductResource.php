<?php

namespace App\Http\Resources\product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $category = $this->category;
        $brand = $this->brand;
        $stockUnit = $this->stockUnit;

        return [
            "id" => $this->id,
            "name" => $this->sku,
            "costPrice" => $this->costPrice,
            "unitPrice" => $this->unitPrice,
            "stockAlertLevel" => $this->stockAlertLevel,
            "barcode" => $this->barcode,
            "isDeleted" => $this->isDeleted,
            "isActive" => $this->isActive,
            "image" => $this->image,
            "expirationDate" => $this->expirationDate,
            "taxRate" => $this->taxRate,
            "serialNumber" => $this->serialNumber,
            "batchNumber" => $this->batchNumber,
            "longDescription" => $this->longDescription,
            "shortDescription" => $this->shortDescription,
            "companyId" => $this->companyId,
            "categoryId" => $this->categoryId,
            "categoryName" => $category ? $category->name : null,
            "brandId" => $this->brandId,
            "brandName" => $brand ? $brand->name : null,
            "stockUnitId" => $this->stockUnitId,
            "stockUnitName" => $stockUnit ? $stockUnit->name : null
        ];
    }
}
