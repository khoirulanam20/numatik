<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\KonserController;
use App\Http\Controllers\TentangController;
use App\Http\Controllers\BerandaController;
use App\Http\Controllers\TiketKonserController;
use App\Http\Controllers\PernikahanController;
use App\Http\Controllers\UlangTahunController;
use App\Http\Controllers\ConcertController;
use App\Http\Controllers\LayananDashboardController;
use App\Http\Controllers\KonserInputController;
use App\Http\Controllers\RiwayatController;

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
Route::get('/konser', [KonserController::class, 'index'])->name('konser');
Route::get('/riwayat', [RiwayatController::class, 'index'])->name('riwayat');
Route::get('/tentang', [TentangController::class, 'index'])->name('tentang');
Route::get('/tiket-konser', [TiketKonserController::class, 'index'])->name('tiket-konser');
Route::get('/pernikahan', [PernikahanController::class, 'index'])->name('pernikahan');
Route::post('/pernikahan', [PernikahanController::class, 'store'])->name('pernikahans.store');
Route::get('/ulang-tahun', [UlangTahunController::class, 'index'])->name('ulang-tahun');
Route::post('/ulang-tahun', [UlangTahunController::class, 'store'])->name('ulang-tahuns.store');
Route::post('/konser-input', [KonserInputController::class, 'store'])->name('konser-inputs.store');

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
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/layanan-dashboard', [LayananDashboardController::class, 'index'])->name('layanan.dashboard');
    Route::get('/dashboard/layanan', [LayananDashboardController::class, 'index'])->middleware(['auth', 'verified', 'role:admin'])->name('dashboard.layanan');
});


require __DIR__.'/auth.php';