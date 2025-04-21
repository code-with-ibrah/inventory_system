<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSupplier extends Model
{
    protected $fillable = [
        "productId", "supplierId", "companyId",
        "isDeleted", "isActive"
    ];

    public function suppliers(){
        return $this->hasMany(Product::class, "id", "productId");
    }

//    public function products(){
//        return $this->hasMany(Product::class, "id", "productId");
//    }

}
