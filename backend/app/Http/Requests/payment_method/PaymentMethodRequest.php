<?php

namespace App\Http\Requests\payment_method;

use Illuminate\Foundation\Http\FormRequest;

class PaymentMethodRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            "name" => ["required", "unique:payment_methods,name"],
            "companyId" => ["required", "exists:companies,id"]
        ];
    }
}
