<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
      "orderId", "productId", "description",
      "quantity", "unitPriceAtSale", "totalCost",
      "isActive", "totalCost", "isDeleted",
      "companyId"
    ];

    public function product(){
        return $this->hasOne(Product::class, "id", "productId");
    }
}
