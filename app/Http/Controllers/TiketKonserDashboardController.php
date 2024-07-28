<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ConcertTicket;
use Inertia\Inertia;
use App\Models\User;

class TiketKonserDashboardController extends Controller
{
    public function index()
    {
        $tickets = ConcertTicket::with('concert')
            ->where('user_id', auth()->id())
            ->where('status', 'paid')
            ->get();
        
        return Inertia::render('DashboardPages/TiketKonserDashboard', [
            'tickets' => $tickets
        ]);
    }

    public function users()
    {
        return User::all();
    }
}