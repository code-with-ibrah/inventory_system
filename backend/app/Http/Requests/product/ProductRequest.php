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
            "unitPrice" => ["require"],
            "quantity" => ["required"],
            "stockAlertLevel" => ["required"],
            "companyId" => ["required", "exists:companies,id"],
            "categoryId" => ["required", "exists:categories"],
            "brandId" => ["required", "exists:brands,id"],
//            "stockUnitId" => ["required", "exists:stock_units,id"],
            "image" => ["nullable", "mimes:jpeg,png,gif,bmp,webp,svg"],
            "expirationDate" => ["nullable"],
            "taxRate" => ["nullable", "numeric"],
        ];
    }
}




