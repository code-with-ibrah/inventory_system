<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('product_suppliers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("productId");
            $table->foreign("productId")
                ->on("products")
                ->references("id")
                ->onUpdate("cascade")
                ->onDelete("cascade");

            $table->unsignedBigInteger("supplierId");
            $table->foreign("supplierId")
                ->on("suppliers")
                ->references("id")
                ->onUpdate("cascade")
                ->onDelete("cascade");

            $table->timestamps();
            $table->boolean("isDeleted")->default(false)->nullable();
            $table->boolean("isActive")->default(true)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_suppliers');
    }
};
