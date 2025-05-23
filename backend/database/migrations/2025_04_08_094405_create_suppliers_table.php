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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string("name")->unique();
            $table->string("phone")->unique();
            $table->string("companyName")->nullable();
            $table->text("addressLineOne")->nullable();
            $table->text("addressLineTwo")->nullable();
            $table->string("email")->unique();
            $table->string("registrationDate")->nullable();
            $table->foreignId("companyId")->constrained("companies");
            $table->boolean("isDeleted")->default(false)->nullable();
            $table->boolean("isActive")->default(true)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
