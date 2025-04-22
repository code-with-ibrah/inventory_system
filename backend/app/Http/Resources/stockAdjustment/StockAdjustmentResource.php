<?php

namespace App\Http\Resources\stockAdjustment;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockAdjustmentResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "date" => $this->date,
            "userId" => $this->userId,
            "user" => $this->user->name,
            "reason" => $this->reason,
            "reasonCode" => $this->reasonCode
        ];
    }
}
