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

        // Proses pembayaran dengan Midtrans
        $paymentController = new PaymentController();
        $result = $paymentController->process($request, $concertId);

        return $result;
    }
}