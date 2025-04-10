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
        Schema::create('stock_adjustment_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId("adjustmentId")->constrained("stock_adjustments");
            $table->foreignId("productId")->constrained("products");
            $table->integer("previousQuantity");
            $table->integer("adjustedQuantity");
            $table->integer("newQuantity");
            $table->decimal("unitCostAtAdjustment");
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
        Schema::dropIfExists('stock_adjustment_items');
    }
};
