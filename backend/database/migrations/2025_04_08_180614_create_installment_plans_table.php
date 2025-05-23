<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('installment_plans', function (Blueprint $table) {
            $table->id();
            $table->string("name")->unique();
            $table->integer("installmentPayCount");
            $table->integer("installmentMonthCount");
            $table->decimal("interestRate", 10, 2)->default(0.00);
            $table->string("description")->nullable();
            $table->foreignId("companyId")->constrained("companies");
            $table->boolean("isActive")->default(true);
            $table->boolean("isDeleted")->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('installment_plans');
    }
};
