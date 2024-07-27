<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pernikahan;
use App\Models\UlangTahun;
use App\Models\KonserInput;

class LayananDashboardController extends Controller
{
    public function index()
    {
        $pernikahans = Pernikahan::all();
        $ulangTahuns = UlangTahun::all();
        $konserInputs = KonserInput::all();
        return Inertia::render('DashboardPages/LayananDashboard', [
            'pernikahans' => $pernikahans,
            'ulangTahuns' => $ulangTahuns,
            'konserInputs' => $konserInputs
        ]);
    }

    public function getPernikahans()
    {
        $pernikahans = Pernikahan::all();
        return response()->json($pernikahans);
    }

    public function destroy(Pernikahan $pernikahan)
    {
        $pernikahan->delete();
        return response()->json(['message' => 'Data pernikahan berhasil dihapus']);
    }
}