<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TiketKonserController extends Controller
{
    public function index()
    {
        return Inertia::render('TiketKonser');
    }
}