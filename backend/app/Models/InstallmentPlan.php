<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstallmentPlan extends Model
{
    protected $fillable = [
        "name", "installmentPayCount",
        "installmentMonthCount", "interestRate",
        "description", "companyId", "isActive",
        "isDeleted"
    ];
}
