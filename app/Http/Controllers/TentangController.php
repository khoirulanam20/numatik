<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TentangController extends Controller
{
    public function index()
    {
        return Inertia::render('Tentang');
    }
}