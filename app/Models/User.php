<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'photo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relasi dengan KonserInput
    public function konserInputs()
    {
        return $this->hasMany(KonserInput::class, 'id_user');
    }

    // Relasi dengan UlangTahun
    public function ulangTahuns()
    {
        return $this->hasMany(UlangTahun::class, 'id_user');
    }

    // Relasi dengan Pernikahan
    public function pernikahans()
    {
        return $this->hasMany(Pernikahan::class, 'id_user');
    }

    // Relasi dengan ConcertTicket
    public function concertTickets()
    {
        return $this->hasMany(ConcertTicket::class, 'id_user');
    }
}