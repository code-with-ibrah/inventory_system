<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoodsReceiptItem extends Model
{
    protected $fillable = [
        "goodsReceiptId", "productId", "quantityReceived",
        "unitPriceAtReceipt", "isActive", "isDeleted",
        "companyId"
    ];

    public function product(){
        return $this->hasOne(Product::class, "id","productId");
    }
}
