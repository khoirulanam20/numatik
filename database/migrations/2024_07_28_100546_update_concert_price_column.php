<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateConcertPriceColumn extends Migration
{
    public function up()
    {
        Schema::table('concerts', function (Blueprint $table) {
            $table->decimal('concert_price', 15, 2)->change();
        });
    }

    public function down()
    {
        Schema::table('concerts', function (Blueprint $table) {
            $table->integer('concert_price')->change();
        });
    }
}