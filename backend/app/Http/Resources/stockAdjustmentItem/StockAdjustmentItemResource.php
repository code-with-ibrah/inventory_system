<?php

namespace App\Http\Resources\stockAdjustmentItem;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockAdjustmentItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "productId" => $this->productId,
            "product" => $this->product->name,
            "newQuantity" => $this->newQuantity,
            "adjustmentId" => $this->adjustmentId,
            "previousQuantity" => $this->previousQuantity,
            "adjustedQuantity" => $this->adjustedQuantity,
            "associatedCost" => $this->associatedCost,
            "unitCostAtAdjustment" => $this->unitCostAtAdjustment,
            "status" => ($this->adjustedQuantity > 0) ? 'Addition' : 'Subtraction'
        ];
    }
}
