<?php

namespace App\Http\Resources\installment_plan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InstallmentPlanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "installmentPayCount" => $this->installmentPayCount,
            "installmentMonthCount" => $this->installmentMonthCount,
            "interestRate" => $this->interestRate,
            "description" => $this->description,
        ];
    }
}
