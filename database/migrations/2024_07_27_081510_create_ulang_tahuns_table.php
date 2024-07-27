<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ulang_tahuns', function (Blueprint $table) {
            $table->id();
            $table->string('nama_acara');
            $table->string('lokasi');
            $table->date('tanggal');
            $table->text('deskripsi');
            $table->string('nomor_hp');
            $table->string('atas_nama');
            $table->string('paket');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ulang_tahuns');
    }
};