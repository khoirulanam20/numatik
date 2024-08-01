<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Concert;
use Midtrans\Config;
use Midtrans\Snap;
use Illuminate\Support\Facades\Log;
use App\Models\ConcertTicket;
use Midtrans\Notification;

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
            
            Log::info('Memproses pembayaran untuk konser: ' . $concert->concert_name);

            $ticket = ConcertTicket::create([
                'user_id' => $user->id,
                'concert_id' => $concert->id,
                'status' => 'pending',
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

            Log::info('Parameter Midtrans: ' . json_encode($midtransParams));

            $snapToken = Snap::getSnapToken($midtransParams);
            
            Log::info('Token Snap dibuat: ' . $snapToken);

            return response()->json(['snap_token' => $snapToken, 'ticket_id' => $ticket->id]);
        } catch (\Exception $e) {
            Log::error('Kesalahan pemrosesan pembayaran: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function handleCallback(Request $request)
    {
        try {
            $notification = new Notification();

            $transaction = $notification->transaction_status;
            $type = $notification->payment_type;
            $orderId = $notification->order_id;
            $fraud = $notification->fraud_status;

            Log::info('Callback diterima: ' . json_encode($notification));

            $ticketId = substr($orderId, 7);
            $ticket = ConcertTicket::find($ticketId);

            if (!$ticket) {
                Log::error('Tiket tidak ditemukan untuk ID: ' . $ticketId);
                return response('Tiket tidak ditemukan', 404);
            }

            if ($transaction == 'capture') {
                if ($type == 'credit_card') {
                    if($fraud == 'challenge') {
                        $ticket->status = 'challenge';
                    } else {
                        $ticket->status = 'success';
                    }
                }
            } elseif ($transaction == 'settlement') {
                $ticket->status = 'success';
            } elseif($transaction == 'pending') {
                $ticket->status = 'pending';
            } elseif ($transaction == 'deny') {
                $ticket->status = 'deny';
            } elseif ($transaction == 'expire') {
                $ticket->status = 'expire';
            } elseif ($transaction == 'cancel') {
                $ticket->status = 'cancel';
            }

            $ticket->save();
            Log::info('Status tiket diperbarui menjadi: ' . $ticket->status);

            return response('OK', 200);
        } catch (\Exception $e) {
            Log::error('Kesalahan dalam menangani callback: ' . $e->getMessage());
            return response('Kesalahan Server', 500);
        }
    }
}