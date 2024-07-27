<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('weddings', function (Blueprint $table) {
            $table->id();
            $table->string('couple_name');
            $table->string('wedding_location');
            $table->date('wedding_date');
            $table->string('wedding_package');
            $table->string('wedding_image')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('weddings');
    }
};