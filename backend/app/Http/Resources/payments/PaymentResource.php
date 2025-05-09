<?php

namespace App\Http\Resources\payments;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "date" => $this->date,
            "customerId" => $this->customerId,
            "amount" => $this->amount,
//            "customer" => $this->customer ? [
//                "name" => $this->customer->name
//            ]: null,
            "orderId" => $this->orderId
        ];
    }
}
