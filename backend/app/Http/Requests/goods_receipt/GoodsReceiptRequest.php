<?php

namespace App\Http\Requests\goods_receipt;

use Illuminate\Foundation\Http\FormRequest;

class GoodsReceiptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "supplierId" => ["required", "exists:suppliers,id"],
            "userId" => ["required", "exists:users,id"],
            "date" => ["required"],
            "totalAmount" => ["required"],
            "conditionOfGoods" => ["nullable"],
            "companyId" => ["required", "exists:companies,id"]
        ];
    }
}
