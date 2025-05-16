<?php

namespace App\Http\Resources\order;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "orderNumber" => $this->orderNumber,
            "date" => $this->date,
            "customerId" => $this->customerId,
            "customer" => $this->customer ? [
                "name" => $this->customer->name
            ] : null,
            "amount" => $this->amount,
            "status" => $this->status ?? "preparing",
            "discount" => $this->discount,
            "userId" => $this->id,
            "user" => $this->user ? [
                "name" => $this->user->name
            ] : null,
            'totalPayments' => $this->whenLoaded('payments', function ($payments) {
                return (float) $payments->sum('amount');
            }, 0),
            "originalPrice" => $this->originalPrice
        ];
    }
}
