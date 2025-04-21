<?php

namespace App\Http\Requests\product_supplier;

use Illuminate\Foundation\Http\FormRequest;

class ProductSupplierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "supplierId" => ["required", "exists:suppliers,id"],
            "productId" => ["required", "exists:products,id"]
        ];
    }
}
