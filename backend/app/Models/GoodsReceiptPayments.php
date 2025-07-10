<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoodsReceiptPayments extends Model
{
    public $timestamps = false;

    protected $fillable = [
        "supplierId", "amount", "date"
    ];

    public function supplier(){
        return $this->belongsTo(Payment::class, "supplierId", "id");
    }

}
