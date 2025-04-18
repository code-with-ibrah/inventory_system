<?php

namespace App\Http\Requests\supplier;

use Illuminate\Foundation\Http\FormRequest;

class SupplierRequest extends FormRequest
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
            "name" => ["required"],
            "phone" => ["required"],
            "companyName" => ["required"],
            "productId" => ["nullable", "exists:products,id"],
            "registrationDate" => ["nullable", "required"],
            "addressLineOne" => ["required", "min:3"],
            "addressLineTwo" => ["nullable", "min:3"],
            "companyId" => ["required", "exists:companies,id"]
        ];
    }
}
