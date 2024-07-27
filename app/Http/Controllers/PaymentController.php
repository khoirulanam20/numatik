<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Concert;
use Midtrans\Config;
use Midtrans\Snap;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Exception\RequestException;

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
            Log::info('Midtrans Server Key: ' . substr(config('services.midtrans.server_key'), 0, 10) . '...');
            Log::info('Midtrans Is Production: ' . (config('services.midtrans.is_production') ? 'true' : 'false'));

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

            $paymentUrl = Snap::createTransaction($midtransParams)->redirect_url;
            
            Log::info('Payment URL generated: ' . $paymentUrl);

            return response()->json(['paymentUrl' => $paymentUrl]);
        } catch (\Exception $e) {
            Log::error('Payment processing error: ' . $e->getMessage());
            Log::error('Error trace: ' . $e->getTraceAsString());
            if ($e instanceof RequestException) {
                Log::error('API Response: ' . $e->getResponse()->getBody()->getContents());
            }
            return response()->json(['error' => 'Terjadi kesalahan dalam memproses pembayaran: ' . $e->getMessage()], 500);
        }
    }
}