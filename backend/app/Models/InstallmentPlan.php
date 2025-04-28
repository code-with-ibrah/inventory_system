<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstallmentPlan extends Model
{
    protected $fillable = [
        "plan", "installmentPayCount",
        "installmentMonthCount", "interestRate",
        "description", "companyId", "isActive",
        "isDeleted"
    ];
}
