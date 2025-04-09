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
        Schema::create('goods_receipt_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId("goodsReceiptId")->constrained("goods_receipts");
            $table->foreignId("productId")->constrained("products");
            $table->integer("quantityReceived");
            $table->decimal("unitPriceAtReceipt", 10, 2);
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
        Schema::dropIfExists('goods_receipt_items');
    }
};
