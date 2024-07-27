<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Concert;
use Inertia\Inertia;

class KonserDashboardController extends Controller
{
    public function index()
    {
        $konsers = Concert::all();
        return Inertia::render('DashboardPages/KonserDashboard', ['konsers' => $konsers]);
    }
}       