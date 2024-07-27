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
        Schema::create('pernikahans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->string('nama_acara');
            $table->string('lokasi');
            $table->date('tanggal');
            $table->string('atas_nama');
            $table->string('paket');
            $table->timestamps();
            $table->boolean('is_completed')->default(false);
            $table->tinyInteger('status')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pernikahans', function (Blueprint $table){
            $table->dropForeign(['id_user']);
            $table->dropColumn('id_user');
            $table->dropColumn('is_completed');
            $table->dropColumn('status');
        });
    }
};