<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ConcertTicket;
use Barryvdh\DomPDF\Facade\Pdf;

class RiwayatController extends Controller
{
    public function index()
    {
        $concertTickets = ConcertTicket::with('concert')
            ->where('user_id', auth()->id())
            ->get();
        
        return Inertia::render('Riwayat', [
            'concertTickets' => $concertTickets
        ]);
    }

    public function downloadTicket($ticketId)
    {
        $ticket = ConcertTicket::with('concert')->findOrFail($ticketId);
        $pdf = Pdf::loadView('pdf.concert-ticket', compact('ticket'));
        return $pdf->download('tiket_konser.pdf');
    }
}