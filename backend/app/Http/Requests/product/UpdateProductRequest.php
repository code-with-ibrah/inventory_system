<?php

namespace App\Http\Requests\product;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            "name" => ["required", "unique:products,name"],
            "sku" => ["nullable"],
            "wareHouseId" => ["nullable", "exists:warehouses,id"],
            "costPrice" => ["required", "numeric"],
            "unitPrice" => ["required", "numeric"],
            "standardPackageQuantity" => ["nullable", "numeric"],
            "stockAlertLevel" => ["nullable", "numeric"],
            "categoryId" => ["required", "numeric", "exists:categories,id"],
            "brandId" => ["required", "numeric", "exists:brands,id"],
            "stockUnitId" => ["required", "numeric", "exists:stock_units,id"],
            "expirationDate" => ["nullable"],
            "taxRate" => ["nullable", "numeric"],
        ];
    }
}
