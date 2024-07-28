<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Concert;
use Midtrans\Config;
use Midtrans\Snap;
use Illuminate\Support\Facades\Log;
use App\Models\ConcertTicket;
use App\User;

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

            $orderId = 'TICKET-' . uniqid();

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

            return response()->json(['snap_token' => $snapToken, 'order_id' => $orderId]);
        } catch (\Exception $e) {
            Log::error('Payment processing error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function handleCallback(Request $request)
    {
        Log::info('Callback received: ' . json_encode($request->all()));

        $serverKey = config('services.midtrans.server_key');
        $hashed = hash("sha512", $request->order_id.$request->status_code.$request->gross_amount.$serverKey);
        
        if ($hashed == $request->signature_key) {
            Log::info('Signature verified');
            
            if ($request->transaction_status == 'capture' || $request->transaction_status == 'settlement') {
                Log::info('Transaction status is capture or settlement');
                
                $orderId = $request->order_id;
                $concertId = substr($orderId, 7, strpos($orderId, '-', 7) - 7);
                
                Log::info('Extracted concert ID: ' . $concertId);
                $concert = Concert::find($concertId);
                $user = \App\Models\User::where('email', $request->email)->first();
                
                if ($concert && $user) {
                    Log::info('Concert and user found. Creating ticket.');
                    try {
                        $ticket = ConcertTicket::create([
                            'user_id' => $user->id,
                            'concert_id' => $concert->id,
                            'status' => 'paid',
                            'purchase_date' => now(),
                            'order_id' => $orderId
                        ]);
                        
                        Log::info('Ticket created successfully: ' . $ticket->id);
                    } catch (\Exception $e) {
                        Log::error('Error creating ticket: ' . $e->getMessage());
                    }
                } else {
                    Log::warning('Concert or user not found. Concert ID: ' . $concertId . ', Email: ' . $request->email);
                }
            } else {
                Log::info('Transaction status is not capture or settlement: ' . $request->transaction_status);
            }
        } else {
            Log::warning('Invalid signature');
        }
        
        return response('OK', 200);
    }
}