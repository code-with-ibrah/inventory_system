<?php

namespace App\Http\Requests\stock_unit;

use Illuminate\Foundation\Http\FormRequest;

class StockUnitRequest extends FormRequest
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
            "companyId" => ["required", "exists:companies,id"]
        ];
    }
}
