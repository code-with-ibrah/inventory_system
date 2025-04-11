<?php

namespace App\Http\Requests\product;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "unique:products,name"],
            "sku" => ["nullable"],
            "costPrice" => ["required", "numeric"],
            "unitPrice" => ["require", "numeric"],
            "quantity" => ["required", "numeric"],
            "stockAlertLevel" => ["required", "numeric"],
            "companyId" => ["required", "numeric", "exists:companies,id"],
            "categoryId" => ["required", "numeric", "exists:categories"],
            "brandId" => ["required", "numeric", "exists:brands,id"],
            "supplierId" => ["required", "numeric", "exists:suppliers,id"],
            "stockUnitId" => ["required", "numeric", "exists:stock_units,id"],
            "image" => ["nullable", "mimes:jpeg,png,gif,bmp,webp,svg"],
            "expirationDate" => ["nullable"],
            "taxRate" => ["nullable", "numeric"],
        ];
    }
}




