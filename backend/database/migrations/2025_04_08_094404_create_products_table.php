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
            $table->string("name");
            $table->string("sku")->nullable();
            $table->string("image")->nullable();
            $table->string("site")->nullable();
            $table->decimal("costPrice", 10, 2)->default(0.00);
            $table->decimal("unitPrice", 10, 2)->default(0.00);
            $table->integer("standardPackageQuantity")->default(0);
            $table->integer("stockAlertLevel");
            $table->foreignId("companyId")->constrained("companies");

            $table->unsignedBigInteger("categoryId")->nullable();
            $table->foreign("categoryId")->on("categories")
                ->references("id")
                ->onUpdate("cascade")->onDelete("cascade");

            $table->foreignId("brandId")->constrained("brands");
            // new columns
            $table->string("expirationDate")->nullable();
            $table->decimal("taxRate", 10, 2)->default(0.00);
            $table->string("serialNumber")->nullable();
            $table->string("batchNumber")->nullable();
            $table->foreignId("stockUnitId")->constrained("stock_units");
            $table->string("shortDescription")->nullable();
            $table->string("longDescription")->nullable();

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
