<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UlangTahun extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_acara',
        'lokasi',
        'tanggal',
        'deskripsi', // Added deskripsi column
        'nomor_hp',
        'atas_nama',
        'paket',
        'id_user',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}