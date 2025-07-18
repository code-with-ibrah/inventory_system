<?php

namespace App\Http\Requests\product;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            "wareHouseId" => ["required", "exists:warehouses,id"],
            "costPrice" => ["nullable", "numeric"],
            "unitPrice" => ["required", "numeric"],
            "quantity" => ["nullable", "numeric"],
            "standardPackageQuantity" => ["nullable", "numeric"],
            "locationInWarehouse" => ["nullable"],
            "stockAlertLevel" => ["required", "numeric"],
            "companyId" => ["required", "numeric", "exists:companies,id"],
            "categoryId" => ["required", "numeric", "exists:categories,id"],
            "brandId" => ["required", "numeric", "exists:brands,id"],
            "supplierId" => ["nullable", "numeric", "exists:suppliers,id"],
            "stockUnitId" => ["required", "numeric", "exists:stock_units,id"],
            "image" => ["nullable", "mimes:jpeg,png,gif,bmp,webp,svg"],
            "expirationDate" => ["nullable"],
            "taxRate" => ["nullable", "numeric"],
        ];
    }
}




