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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("name")->unique();
            $table->string("sku")->nullable();
            $table->decimal("price", 10, 2);
            $table->integer("quantity");
            $table->integer("stockAlertLevel");
            $table->foreignId("companyId")->constrained("companies");

            $table->unsignedBigInteger("categoryId")->nullable();
            $table->foreign("categoryId")
                ->on("categories")
                ->references("id")
                ->onUpdate("cascade")
                ->onDelete("cascade");

            $table->foreignId("brandId")->constrained("brands");

            $table->string("barcode")->nullable();
            $table->timestamps();
            $table->boolean("isDeleted")->default(false)->nullable();
            $table->boolean("isActive")->default(true)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
