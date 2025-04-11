<?php

namespace App\Http\Requests\product_supplier;

use Illuminate\Foundation\Http\FormRequest;

class ProductSupplierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "supplierId" => ["required", "exists:suppliers,id"],
            "productId" => ["required", "exists:products,id"],
            "companyId" => ["required", "exists:companies,id"],
        ];
    }
}
