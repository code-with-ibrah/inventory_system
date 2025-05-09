<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        "date", "amount", "customerId",
        "orderId", "isActive", "isDeleted",
        "companyId"
    ];

    public function customer(){
        return $this->belongsTo(Payment::class, "customerId", "id");
    }
}
