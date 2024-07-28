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

    public function process(Request $request, $concertId)
    {
        try {
            $concert = Concert::findOrFail($concertId);
            $user = $request->user();
            
            Log::info('Processing payment for concert: ' . $concert->concert_name);

            // Buat tiket terlebih dahulu
            $ticket = ConcertTicket::create([
                'user_id' => $user->id,
                'concert_id' => $concert->id,
                'status' => 'paid',
                'purchase_date' => now(),
            ]);

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
        } catch (\Exception $e) {
            Log::error('Payment processing error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function handleCallback(Request $request)
    {
        $serverKey = config('services.midtrans.server_key');
        $hashed = hash("sha512", $request->order_id.$request->status_code.$request->gross_amount.$serverKey);
        if ($hashed == $request->signature_key) {
            if ($request->transaction_status == 'capture' || $request->transaction_status == 'settlement') {
                $orderId = $request->order_id;
                $ticketId = substr($orderId, 6); // Assuming order_id format is 'TICKET-{id}'
                $ticket = ConcertTicket::find($ticketId);
                if ($ticket) {
                    $ticket->status = 'paid';
                    $ticket->save();
                }
            }
        }
        return response('OK', 200);
    }
}