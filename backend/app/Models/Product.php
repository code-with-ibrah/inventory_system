<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        "name", "sku", "unitPrice","costPrice",
        "quantity", "stockAlertLevel", "stockUnitId",
        "companyId", "categoryId", "brandId", "taxRate",
        "barcode", "isActive", "isDeleted", "image",
        "expirationDate", "serialNumber", "batchNumber",
        "longDescription", "shortDescription"
    ];


    public function category(){
        return $this->hasOne(Category::class, "categoryId");
    }

    public function brand(){
        return $this->hasOne(Brand::class, "brandId");
    }

//    public function stockUnit(){
//        return $this->hasOne(StockUnit::class, "stockUnitId");
//    }

    public function company(){
        return $this->hasOne(Company::class, "companyId");
    }

    // add the relationship b/t product and suplier_product table

}
