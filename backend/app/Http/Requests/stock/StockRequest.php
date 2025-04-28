<?php

namespace App\Http\Requests\stock;

use Illuminate\Foundation\Http\FormRequest;

class StockRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // "productId" => ["required", "unique:stocks,productId", "exists:products,id"],
            "wareHouseId" => ["required", "exists:warehouses,id"],
            "stockAlertLevel" => ["required", "numeric"],
            "locationInWarehouse" => ["nullable"],
            "companyId" => ["exists:companies,id"]
        ];
    }
}
