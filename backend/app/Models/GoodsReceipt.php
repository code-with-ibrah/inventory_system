<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoodsReceipt extends Model
{
    protected $fillable = [
        "supplierId", "userId", "date",
        "totalAmount", "conditionOfGoods",
        "isActive", "isDeleted", "companyId",
        "receiptNumber"
    ];

    public function user(){
        return $this->hasOne(User::class, "id", "userId");
    }

    public function goodsReceiptItems()
    {
        return $this->hasMany(GoodsReceiptItem::class, 'goodsReceiptId', 'id');
    }

    public function supplier(){
        return $this->hasOne(Supplier::class, "id", "supplierId");
    }
}
