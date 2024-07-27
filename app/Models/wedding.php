<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wedding extends Model
{
    use HasFactory;

    protected $fillable = [
        'couple_name',
        'wedding_location',
        'wedding_date',
        'wedding_package',
        'wedding_image',
    ];
}