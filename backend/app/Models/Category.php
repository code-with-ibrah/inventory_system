<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        "name", "companyId", "parentId",
        "isDeleted", "isActive"
    ];

    public function parent(){
        return $this->belongsTo(Category::class, "parentId");
    }

    public function company(){
        return $this->belongsTo(Company::class, 'companyId');
    }

    public function children(){
        return $this->hasMany(Category::class, 'parentId');
    }

}
