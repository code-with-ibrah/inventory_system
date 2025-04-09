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
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable();
            $table->string("code")->unique();
            $table->string("location")->nullable();
            $table->string("addressLineOne")->nullable();
            $table->string("addressLineTwo")->nullable();
            $table->string("city")->nullable();
            $table->string("country")->nullable();
            $table->string("phone")->nullable();
            $table->string("email")->nullable();
            $table->string("type")->default('storage')->nullable();
            $table->string('capacity')->nullable();
            $table->string('description')->nullable();

            $table->foreignId("creatorId")->constrained("users");
            $table->foreignId("companyId")->constrained("companies");


            $table->unsignedBigInteger("lastUpdateUserId")->nullable();
            $table->foreign("lastUpdateUserId")
                ->on("users")
                ->references("id")
                ->onUpdate("cascade")
                ->onDelete("cascade");

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
        Schema::dropIfExists('warehouses');
    }
};
