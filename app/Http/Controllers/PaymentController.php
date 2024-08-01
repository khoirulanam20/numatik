<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Concert;
use Midtrans\Config;
use Midtrans\Snap;
use Illuminate\Support\Facades\Log;
use App\Models\ConcertTicket;

class PaymentController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production', false);
        Config::$isSanitized = config('services.midtrans.is_sanitized', true);
        Config::$is3ds = config('services.midtrans.is_3ds', true);
    }

    public function process(Request $request, $ticketId)
    {
        try {
            $ticket = ConcertTicket::with('concert')->findOrFail($ticketId);
            $concert = $ticket->concert;
            $user = $request->user();
            
            Log::info('Processing payment for concert: ' . $concert->concert_name);

            // Perbarui status tiket
            $ticket->status = 'pending';
            $ticket->save();

            $orderId = 'TICKET-' . $ticket->id;

            $transaction_details = [
                'order_id' => $orderId,
                'gross_amount' => (int) $concert->concert_price,
            ];

            $item_details = [[
                'id' => $concert->id,
                'price' => (int) $concert->concert_price,
                'quantity' => 1,
                'name' => $concert->concert_name,
            ]];

            $customer_details = [
                'first_name' => $user->name,
                'email' => $user->email,
            ];

            $midtransParams = [
                'transaction_details' => $transaction_details,
                'customer_details' => $customer_details,
                'item_details' => $item_details,
            ];

            Log::info('Midtrans parameters: ' . json_encode($midtransParams));

            $snapToken = Snap::getSnapToken($midtransParams);
            
            Log::info('Snap Token generated: ' . $snapToken);

            return response()->json(['snap_token' => $snapToken, 'ticket_id' => $ticket->id]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('Concert not found: ' . $ticketId);
            return response()->json(['error' => 'Konser tidak ditemukan'], 404);
        } catch (\Exception $e) {
            Log::error('Payment processing error: ' . $e->getMessage());
            return response()->json(['error' => 'Terjadi kesalahan saat memproses pembayaran'], 500);
        }
    }
}