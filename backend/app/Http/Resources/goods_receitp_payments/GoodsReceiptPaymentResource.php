<?php

namespace App\Http\Resources\goods_receitp_payments;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GoodsReceiptPaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "date" => $this->date,
            "supplierId" => $this->supplierId,
            "amount" => $this->amount
        ];
    }
}
