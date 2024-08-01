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
            ->where('status', 'settlement')
            ->get();
        
        return Inertia::render('DashboardPages/TiketKonserDashboard', [
            'tickets' => $tickets
        ]);
    }

    public function users()
    {
        return User::all();
    }

    public function updateStatus(Request $request)
    {
        try {
            $ticket = ConcertTicket::where('order_id', $request->order_id)->firstOrFail();
            $ticket->status = $request->status;
            $ticket->save();

            \Illuminate\Support\Facades\Log::info('Status updated successfully', ['order_id' => $request->order_id, 'status' => $request->status]);

            return response()->json(['message' => 'Status berhasil diperbarui']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error updating status: ' . $e->getMessage());
            return response()->json(['error' => 'Terjadi kesalahan saat memperbarui status'], 500);
        }
    }
}