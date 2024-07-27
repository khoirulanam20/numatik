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
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->string('nama_acara');
            $table->string('lokasi');
            $table->date('tanggal');
            $table->text('deskripsi'); // Added deskripsi column
            $table->string('nomor_hp');
            $table->string('atas_nama');
            $table->string('paket');
            $table->boolean('status')->default(0); // Added status column with default 0
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ulang_tahuns', function (Blueprint $table){
            $table->dropForeign(['id_user']);
            $table->dropColumn('id_user');
            $table->dropColumn('status'); // Drop the status column
            $table->dropColumn('deskripsi'); // Drop the deskripsi column
        });
    }
};