<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string("date");
            $table->decimal("amount", 10, 2);
            $table->foreignId("orderId")->constrained("orders");
            $table->foreignId("customerId")->constrained("customers");
            $table->boolean("isActive")->default(true);
            $table->boolean("isDeleted")->default(false);
            $table->timestamps();
            $table->foreignId("companyId")->constrained("companies");
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
