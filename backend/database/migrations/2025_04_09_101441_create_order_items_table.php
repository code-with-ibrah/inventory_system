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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId("orderId")->constrained("orders");
            $table->foreignId("productId")->constrained("products");
            $table->string("description")->nullable();
            $table->integer("quantity")->default(0);
            $table->decimal("unitPriceAtSale", 10, 2)->default(0);
            $table->decimal("totalCost", 10, 2)->default(0.00);
            $table->boolean("isActive")->default(true);
            $table->boolean("isDeleted")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
