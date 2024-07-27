<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\UlangTahun;
use Illuminate\Http\Request;

class UlangTahunController extends Controller
{
    public function index()
    {
        return Inertia::render('UlangTahun');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_acara' => 'required',
            'lokasi' => 'required',
            'tanggal' => 'required|date',
            'deskripsi' => 'required',
            'nomor_hp' => 'required',
            'atas_nama' => 'required',
            'paket' => 'required',
        ]);

        $validatedData['id_user'] = auth()->id();
        UlangTahun::create($validatedData);

        return redirect()->back()->with('success', 'Data ulang tahun berhasil disimpan.');
    }

    public function destroy(UlangTahun $ulangTahun)
    {
        $ulangTahun->delete();
        return response()->json(['message' => 'Ulang Tahun berhasil dihapus']);
    }
}