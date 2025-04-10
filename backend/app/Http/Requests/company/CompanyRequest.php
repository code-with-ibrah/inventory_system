<?php

namespace App\Http\Requests\company;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
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
            "name" => ["required", "min:3", "unique:companies,name"],
            "location" => ["required"],
            "address" => ["nullable", "min:3"],
            "phone" => ["required", "unique:companies,phone"],
            "logo" => ["nullable", "mimes:jpeg,png,gif,bmp,webp,svg"],
        ];
    }
}



