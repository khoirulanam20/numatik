<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pernikahan;

class PernikahanDashboardController extends Controller
{
    public function index()
    {
        $pernikahans = Pernikahan::all();
        return Inertia::render('DashboardPages/PernikahanDashboard', [
            'pernikahans' => $pernikahans
        ]);
    }
}