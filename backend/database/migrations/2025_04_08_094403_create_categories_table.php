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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string("name")->unique();
            $table->foreignId("companyId")->constrained("companies");
            $table->unsignedBigInteger("parentId")->nullable();
            $table->foreign("parentId")
                ->on("categories")
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
        Schema::dropIfExists('categories');
    }
};
