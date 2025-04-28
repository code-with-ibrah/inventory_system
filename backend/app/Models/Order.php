<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        "orderNumber", "date", "amount",
        "customerId", "companyId", "status",
        "installmentPlanId", "currency", "paymentMethodId",
        "discount", "tax-amount", "userId",
        "isActive", "isDeleted", "companyId"
    ];
}
