<?php

namespace App\Http\Requests\brand;

use Illuminate\Foundation\Http\FormRequest;

class BrandRequest extends FormRequest
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
            "name" => ["required", "min:3"],
            "logo" => ["nullable", "mimes:jpeg,png,gif,bmp,webp,svg"],
            "companyId" => ["required", "exists:companies,id"],
        ];
    }
}
