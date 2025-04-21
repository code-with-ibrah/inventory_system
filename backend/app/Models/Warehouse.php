<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        "name", "code", "location",
        "addressLineOne", "addressLineTwo",
        "city", "country", "phone", "email",
        "type", "capacity", "description", "creatorId",
        "companyId", "lastUpdateUserId", "isDeleted", "isActive"
    ];

    public function creator(){
        return $this->belongsTo(User::class, "creatorId", "id");
    }

    public function lastEditor(){
        return $this->belongsTo(User::class, "lastUpdateUserId", "id");
    }


}
