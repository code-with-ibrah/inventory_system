<?php

namespace App\Http\Requests\stockAdjustmentItem;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStockAdjustmentItemRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            "adjustmentId" => ["required", "exists:stock_adjustments,id"],
            "adjustedQuantity" => ["required", 'numeric'],
        ];
    }
}
