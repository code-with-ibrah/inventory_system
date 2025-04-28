<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        "name", "companyName", "location",
        "phone", "address", "registrationDate",
        "isActive", "isDeleted"
    ];
}
