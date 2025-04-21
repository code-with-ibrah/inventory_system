<?php

namespace App\Http\Resources\product_supplier;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductSupplierResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "productId" => $this->productId,
            "supplierId" => $this->supplierId
        ];
    }
}
