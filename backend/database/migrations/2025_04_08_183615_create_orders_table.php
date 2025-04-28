<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string("orderNumber");
            $table->string("date");
            $table->foreignId("customerId")->constrained("customers");
            $table->decimal("amount", 10, 2);
            $table->string("status")->default("pending")->nullable();
            $table->foreignId("installmentPlanId")->constrained("installment_plans");
            $table->string("currency")->nullable();
            $table->string("paymentMethod");
            $table->decimal("discount", 10, 2)->default(0.00)->nullable();
            $table->decimal("tax-amount", 10, 2)->default(0.00)->nullable();
            $table->foreignId("userId")->constrained("users");
            $table->boolean("isActive")->default(true);
            $table->boolean("isDeleted")->default(false);
            $table->timestamps();
            $table->foreignId("companyId")->constrained("companies");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
