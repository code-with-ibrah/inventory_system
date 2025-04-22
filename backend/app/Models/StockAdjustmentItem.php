<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockAdjustmentItem extends Model
{
    protected $fillable = [
        "productId", "adjustmentId",
        "previousQuantity", "adjustedQuantity",
        "newQuantity", "unitCostAtAdjustment",
        "isActive", "isDeleted", "companyId"
    ];

    public function product(){
        return $this->hasOne(Product::class, "id", "productId");
    }

}
