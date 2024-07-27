<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Concert;
use Midtrans\Config;
use Midtrans\Snap;
use Illuminate\Support\Facades\Log;

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
            
            Log::info('Processing payment for concert: ' . $concert->concert_name);

            $orderId = 'ORDER-' . time();

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

            $userData = [
                'first_name' => $request->user()->name,
                'email' => $request->user()->email,
            ];

            $customer_details = [
                'first_name' => $userData['first_name'],
                'email' => $userData['email'],
            ];

            $midtransParams = [
                'transaction_details' => $transaction_details,
                'customer_details' => $customer_details,
                'item_details' => $item_details,
            ];

            Log::info('Midtrans parameters: ' . json_encode($midtransParams));

            $snapToken = Snap::getSnapToken($midtransParams);
            
            Log::info('Snap Token generated: ' . $snapToken);

            return response()->json(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            Log::error('Payment processing error: ' . $e->getMessage());
            Log::error('Error trace: ' . $e->getTraceAsString());
            return response()->json(['error' => 'Terjadi kesalahan dalam memproses pembayaran: ' . $e->getMessage()], 500);
        }
    }
}