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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("companyName");
            $table->string("location");
            $table->string("phone");
            $table->string("address");
            $table->string("registrationDate");
            $table->boolean("isActive")->default(true);
            $table->boolean("isDeleted")->default(false);
            $table->foreignId("companyId")->constrained("companies");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
