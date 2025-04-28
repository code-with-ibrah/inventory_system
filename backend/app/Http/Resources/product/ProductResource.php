<?php

namespace App\Http\Resources\product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use function Laravel\Prompts\map;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $category = $this->category;
        $brand = $this->brand;
        $stockUnit = $this->stockUnit;
        $suppliers = $this->suppliers;

        return [
            "id" => $this->id,
            "name" => $this->name,
            "sku" => $this->sku,
            "costPrice" => $this->costPrice,
            "unitPrice" => $this->unitPrice,
            "quantity" => $this->quantity,
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
            "standardPackageQuantity" => $this->standardPackageQuantity,
            "companyId" => $this->companyId,
            "categoryId" => $this->categoryId,
            "categoryName" => $category ? $category->name : null,
            "brandId" => $this->brandId,
            "brandName" => $brand ? $brand->name : null,
            "stockUnitId" => $this->stockUnitId,
            "stockUnitName" => $stockUnit ? $stockUnit->name : null,
            "stockUnit" => $this->stockUnit,
            "suppliers" => $suppliers ? $suppliers->map(function($supplier){
                return [
                    "id" => $supplier->id,
                    "name" => $supplier->name,
                    "company" => $supplier->companyName
                ];
            }) : null,
            "_count" => [
                "suppliers" => count($suppliers)
            ]
        ];
    }
}
