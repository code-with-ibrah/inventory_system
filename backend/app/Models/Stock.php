<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = [
        "productId", "wareHouseId", "quantityOnHand",
        "stockAlertLevel", "locationInWarehouse",
        "lastStockCheckDate", "isActive", "isDeleted",
        "companyId"
    ];

    public function product(){
        return $this->hasOne(Product::class, "id", "productId");
    }

    public function warehouse(){
        return $this->hasOne(Warehouse::class, "id", "wareHouseId");
    }
}
