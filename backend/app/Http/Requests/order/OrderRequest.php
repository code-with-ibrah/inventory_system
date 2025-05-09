<?php

namespace App\Http\Requests\order;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "orderNumber" => ["required", "unique:orders,orderNumber"],
            "date" => ["required"],
            "customerId" => ["required", "exists:customers,id"],
            "amount" => ["required", "numeric"],
            "installmentPlanId" => ["required", "exists:installment_plans,id"],
            "companyId" => ["required", "exists:companies,id"],
            "userId" => ["required", "exists:users,id"]
        ];
    }
}
