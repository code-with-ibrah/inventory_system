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
            "status" => $this->status,
            "discount" => $this->discount,
            "installmentPlanId" => $this->installmentPlanId,
            "installmentPlan" => $this->installmentPlan ? [
                "name" => $this->installmentPlan->name
            ] : null,
            "userId" => $this->id,
            "user" => $this->user ? [
                "name" => $this->user->name
            ] : null,
//            "payments" => $this->whenLoaded('payments', function($payments){
//                return $payments->map(function($payment){
//                    return $payment->only(["id", "amount"]);
//                });
//            }),
            'totalPayments' => $this->whenLoaded('payments', function ($payments) {
                return number_format($payments->sum('amount'), 2);
            }),
            "originalPrice" => $this->originalPrice
        ];
    }
}
