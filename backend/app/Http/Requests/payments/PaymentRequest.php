<?php

namespace App\Http\Requests\payments;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "customerId" => ["required", "exists:customers,id"],
            "orderId" => ["required", "exists:orders,id"],
            "date" => ["required"],
            "amount" => ["required", "numeric"]
        ];
    }
}
