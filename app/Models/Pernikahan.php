<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pernikahan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_acara',
        'lokasi',
        'tanggal',
        'atas_nama',
        'paket',
        'id_user',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}