<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConcertController;
use App\Http\Controllers\PernikahanController;
use App\Http\Controllers\UlangTahunController;
use App\Http\Controllers\KonserInputController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/concerts', [ConcertController::class, 'getAllConcerts']);
    Route::put('/concerts/{id}', [ConcertController::class, 'update']);
    Route::delete('/concerts/{concert}', [ConcertController::class, 'destroy']);
    Route::get('/pernikahans', [PernikahanController::class, 'index']);
    Route::post('/pernikahans', [PernikahanController::class, 'store']);
    Route::delete('/pernikahans/{pernikahan}', [PernikahanController::class, 'destroy']);
    Route::delete('/ulang-tahuns/{ulangTahun}', [UlangTahunController::class, 'destroy']);
    Route::delete('/konser-inputs/{konserInput}', [KonserInputController::class, 'destroy']);
});