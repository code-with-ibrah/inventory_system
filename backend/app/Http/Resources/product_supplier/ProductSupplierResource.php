<?php

namespace App\Http\Resources\product_supplier;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductSupplierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // $productList = $this->productList;
        // $supplierList = $this->supplierList;

        return [
            "id" => $this->id,
            "productId" => $this->productId,
            "supplierId" => $this->supplierId,
            "isActive" => $this->isActive,
            "isDeleted" => $this->isDeleted
        ];
    }
}
