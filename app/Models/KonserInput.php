<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KonserInput extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_acara',
        'lokasi',
        'tanggal',
        'deskripsi',
        'nomor_hp',
        'atas_nama',
        'paket',
        'id_user',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}