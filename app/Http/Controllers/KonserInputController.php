<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\KonserInput;
use Illuminate\Http\Request;

class KonserInputController extends Controller
{
    public function index()
    {
        return Inertia::render('Konser');
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
        KonserInput::create($validatedData);

        return redirect()->back()->with('success', 'Data konser berhasil disimpan.');
    }

    public function update(Request $request, KonserInput $konserInput)
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

        $konserInput->update($validatedData);

        return redirect()->back()->with('success', 'Data konser berhasil diperbarui.');
    }

    public function destroy(KonserInput $konserInput)
    {
        $konserInput->delete();
        return redirect()->back()->with('success', 'Data konser berhasil dihapus.');
    }

    public function getUserKonserInputs($userId)
    {
        return KonserInput::where('id_user', $userId)->get();
    }
}