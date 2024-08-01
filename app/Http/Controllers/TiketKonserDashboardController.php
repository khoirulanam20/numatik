<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ConcertTicket;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class TiketKonserDashboardController extends Controller
{
    public function index()
    {
        $tickets = ConcertTicket::with('concert')
            ->where('user_id', auth()->id())
            ->get();
        
        return Inertia::render('DashboardPages/TiketKonserDashboard', [
            'tickets' => $tickets
        ]);
    }

    public function users()
    {
        return User::all();
    }

    public function updateStatus(Request $request, $ticketId)
    {
        try {
            Log::info('Received update status request', ['ticket_id' => $ticketId, 'status' => $request->status]);

            // Validasi data yang diterima
            $request->validate([
                'status' => ['required', Rule::in(['settlement', 'pending'])],
            ]);

            Log::info('Validation passed');

            // Cari tiket berdasarkan ID
            $ticket = ConcertTicket::findOrFail($ticketId);
            Log::info('Ticket found', ['ticket' => $ticket]);

            // Perbarui status tiket
            $ticket->status = $request->status;
            $ticket->save();

            Log::info('Status updated successfully', ['ticket_id' => $ticketId, 'status' => $request->status]);

            return response()->json(['message' => 'Status berhasil diperbarui']);
        } catch (\Exception $e) {
            Log::error('Error updating status: ' . $e->getMessage(), ['ticket_id' => $ticketId, 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'Terjadi kesalahan saat memperbarui status: ' . $e->getMessage()], 500);
        }
    }
}