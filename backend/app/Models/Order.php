<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        "orderNumber", "date", "amount",
        "customerId", "companyId", "status",
        "installmentPlanId", "currency", "paymentMethod",
        "discount", "tax-amount", "userId",
        "isActive", "isDeleted", "companyId", "originalPrice"
    ];

    public function user(){
        return $this->belongsTo(User::class, "userId", "id");
    }

    public function customer(){
        return $this->belongsTo(Customer::class, "customerId", "id");
    }

    public function installmentPlan(){
        return $this->belongsTo(InstallmentPlan::class, "installmentPlanId", "id");
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, "orderId", "id");
    }

}
