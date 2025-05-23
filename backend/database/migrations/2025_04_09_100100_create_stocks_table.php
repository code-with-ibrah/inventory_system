<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId("productId")->constrained("products");
            $table->string("productName")->nullable();
            $table->foreignId("wareHouseId")->constrained("warehouses");
            $table->integer("quantityOnHand")->default(0);
            $table->integer("stockAlertLevel")->default(0);
            $table->string("locationInWarehouse")->nullable();
            $table->string("lastStockCheckDate")->nullable();
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
        Schema::dropIfExists('stocks');
    }
};
