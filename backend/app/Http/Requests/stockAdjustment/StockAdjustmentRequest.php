<?php

namespace App\Http\Requests\stockAdjustment;

use Illuminate\Foundation\Http\FormRequest;

class StockAdjustmentRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            "date" => ["required"],
            "userId" => ["required", "exists:users,id"],
            "reason" => ["nullable"],
            "companyId" => ["required", "exists:companies,id"]
        ];
    }
}
