<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = [
      "name", "image", "companyId",
      "parentId", "isActive", "isDeleted"
    ];

    public function parent(){
        return $this->belongsTo(Brand::class, "parentId");
    }

    public function company(){
        return $this->belongsTo(Company::class, 'companyId');
    }
}
