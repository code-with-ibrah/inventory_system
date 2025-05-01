<?php

namespace App\Http\Requests\goods_receipt_item;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGoodsReceiptItemRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "goodsReceiptId" => ["required", "exists:goods_receipts,id"],
            "productId" => ["required", "exists:products,id"],
            "quantityReceived" => ["required", "numeric"],
            "unitPriceAtReceipt" => ["required", "numeric"],
            "companyId" => ["required", "exists:companies,id", "numeric"],
        ];
    }
}
