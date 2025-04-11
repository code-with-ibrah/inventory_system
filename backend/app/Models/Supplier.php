<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        "name", "phone", "companyName", "registrationDate",
        "companyId", "isDeleted", "isActive", "email",
        "addressLineOne", "addressLineTwo"
    ];


    public function products(){
        return $this->belongsToMany(Product::class,'product_suppliers', 'supplierId', 'productId');
    }

}
