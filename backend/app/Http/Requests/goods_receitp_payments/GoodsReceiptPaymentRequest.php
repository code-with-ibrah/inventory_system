<?php

namespace App\Http\Requests\goods_receitp_payments;

use Illuminate\Foundation\Http\FormRequest;

class GoodsReceiptPaymentRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "amount" => ["required"],
            "date" => ["required", "date"],
            "supplierId" => ["required", "numeric", "exists:suppliers,id"],
            "paymentNumber" => ["required", "unique:goods_receipt_payments"]
        ];
    }
}
