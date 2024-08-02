<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\KonserInputController;
use App\Http\Controllers\TentangController;
use App\Http\Controllers\BerandaController;
use App\Http\Controllers\TiketKonserController;
use App\Http\Controllers\PernikahanController;
use App\Http\Controllers\UlangTahunController;
use App\Http\Controllers\ConcertController;
use App\Http\Controllers\LayananDashboardController;
use App\Http\Controllers\RiwayatController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\KonserDashboardController;
use App\Http\Controllers\TiketKonserDashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [BerandaController::class, 'index'])->name('beranda');

Route::get('/layanan', [LayananController::class, 'index'])->name('layanan');
Route::get('/konser', [KonserInputController::class, 'index'])->name('konser');
Route::get('/riwayat', [RiwayatController::class, 'index'])->name('riwayat');
Route::get('/tentang', [TentangController::class, 'index'])->name('tentang');
Route::get('/tiket-konser', [TiketKonserController::class, 'index'])->name('tiket-konser');
Route::get('/pernikahan', [PernikahanController::class, 'index'])->name('pernikahan');
Route::post('/pernikahan', [PernikahanController::class, 'store'])->name('pernikahans.store');
Route::put('/pernikahans/{pernikahan}', [PernikahanController::class, 'update'])->name('pernikahans.update');
Route::delete('/pernikahans/{pernikahan}', [PernikahanController::class, 'destroy'])->name('pernikahans.destroy');
Route::get('/ulang-tahun', [UlangTahunController::class, 'index'])->name('ulang-tahun');
Route::post('/ulang-tahun', [UlangTahunController::class, 'store'])->name('ulang-tahuns.store');
Route::post('/konser-input', [KonserInputController::class, 'store'])->name('konser-inputs.store');
Route::put('/konser-inputs/{konserInput}', [KonserInputController::class, 'update'])->name('konser-inputs.update');
Route::delete('/konser-inputs/{konserInput}', [KonserInputController::class, 'destroy'])->name('konser-inputs.destroy');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'role:admin'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/concerts', [ConcertController::class, 'store'])->name('concerts.store');
    Route::put('/concerts/{id}', [ConcertController::class, 'update'])->name('concerts.update');
    Route::delete('/concerts/{id}', [ConcertController::class, 'destroy'])->name('concerts.destroy');
    Route::get('/riwayat', [RiwayatController::class, 'index'])->name('riwayat.index');
    Route::put('/riwayat/updateKonser/{konserInput}', [RiwayatController::class, 'updateKonser'])->name('riwayat.updateKonser');
    Route::put('/riwayat/updateUlangTahun/{ulangTahun}', [RiwayatController::class, 'updateUlangTahun'])->name('riwayat.updateUlangTahun');
    Route::put('/riwayat/updatePernikahan/{pernikahan}', [RiwayatController::class, 'updatePernikahan'])->name('riwayat.updatePernikahan');
    Route::delete('/riwayat/destroyKonser/{konserInput}', [RiwayatController::class, 'destroyKonser'])->name('riwayat.destroyKonser');
    Route::delete('/riwayat/destroyUlangTahun/{ulangTahun}', [RiwayatController::class, 'destroyUlangTahun'])->name('riwayat.destroyUlangTahun');
    Route::delete('/riwayat/destroyPernikahan/{pernikahan}', [RiwayatController::class, 'destroyPernikahan'])->name('riwayat.destroyPernikahan');
    Route::post('/riwayat/toggleComplete/{ulangTahun}', [RiwayatController::class, 'toggleComplete'])->name('riwayat.toggleComplete');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/layanan-dashboard', [LayananDashboardController::class, 'index'])->name('layanan.dashboard');
    Route::get('/dashboard/layanan', [LayananDashboardController::class, 'index'])->middleware(['auth', 'verified', 'role:admin'])->name('dashboard.layanan');
    Route::get('/dashboard/tiket-konser', [TiketKonserDashboardController::class, 'index'])->name('dashboard.tiket-konser');
    Route::put('/api/tickets/{ticketId}/update-status', [TiketKonserDashboardController::class, 'updateStatus']);
});

Route::post('/payment/callback', [PaymentController::class, 'handleCallback']);
Route::post('/payment/process/{concertId}', [PaymentController::class, 'process'])->name('payment.process');
Route::post('/tiket/buy/{concert}', [TiketKonserController::class, 'buyTicket'])->name('tiket.buy');

Route::get('/riwayat/download-ticket/{ticketId}', [RiwayatController::class, 'downloadTicket'])->name('riwayat.downloadTicket');

require __DIR__.'/auth.php';