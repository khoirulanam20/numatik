<?php

namespace App\Http\Controllers;

use App\Models\Concert;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KonserController extends Controller
{
    public function index()
    {
        return Inertia::render('Konser');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_acara' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'atas_nama' => 'required|string|max:255',
            'paket' => 'required|string|max:255',
        ]);

        Concert::create($validatedData);

        return redirect()->back()->with('message', 'Konser berhasil ditambahkan');
    }

    public function destroy($id)
    {
        $concert = Concert::findOrFail($id);
        $concert->delete();

        return response()->json(['message' => 'Konser berhasil dihapus']);
    }
}