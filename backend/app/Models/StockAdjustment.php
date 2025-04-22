<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockAdjustment extends Model
{
    protected $fillable = [
        "date", "reason", "reasonCode",
        "isActive", "isDeleted", "companyId",
        "userId"
    ];

    public function user(){
        return $this->hasOne(User::class, "id", "userId");
    }
}
