<?php

namespace App\Http\Requests\customer;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            "name" => ["required"],
            "companyName" => ["required"],
            "location" => ["required"],
            "phone" => ["required"],
            "address" => ["required"],
            "registrationDate" => ["required"]
        ];
    }
}
