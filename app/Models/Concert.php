<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concert extends Model
{
    use HasFactory;

    protected $fillable = [
        'concert_name',
        'concert_location',
        'concert_date',
        'concert_price',
        'concert_image',
    ];

}