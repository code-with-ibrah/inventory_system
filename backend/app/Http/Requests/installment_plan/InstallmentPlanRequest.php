<?php

namespace App\Http\Requests\installment_plan;

use Illuminate\Foundation\Http\FormRequest;

class InstallmentPlanRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => ["required", "unique:installment_plans,name"],
            "installmentPayCount" => ["required", "numeric"],
            "installmentMonthCount" => ["required", "numeric"],
            "interestRate" => ["required", "numeric"],
            "companyId" => ["required", "exists:companies,id"]
        ];
    }
}
