<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Concert;
use App\Models\ConcertTicket;
use Illuminate\Http\Request;

class TiketKonserController extends Controller
{
    public function index()
    {
        $concerts = Concert::all();
        return Inertia::render('TiketKonser', [
            'concerts' => $concerts
        ]);
    }

    public function buyTicket(Request $request, $concertId)
    {
        $user = auth()->user();
        $concert = Concert::findOrFail($concertId);

        // Proses pembayaran di sini (gunakan Midtrans atau sistem pembayaran lainnya)

        // Jika pembayaran berhasil, simpan tiket
        $ticket = ConcertTicket::create([
            'user_id' => $user->id,
            'concert_id' => $concert->id,
            'status' => 'paid',
            'purchase_date' => now(),
        ]);

        return response()->json(['message' => 'Tiket berhasil dibeli', 'ticket' => $ticket]);
    }
}