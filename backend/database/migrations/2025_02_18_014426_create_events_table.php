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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Event name
            $table->text('description')->nullable(); // Optional
            $table->timestamp('start_date'); // Starting Date & time of the event
            $table->timestamp('end_date'); // Ending Date & time of the event
            $table->string('location'); // Location (can be a city, venue, etc.)
            $table->integer('max_participants'); // Max participants allowed
            $table->string('thumbnail_url')->nullable(); // Optional
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Host of the event
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
