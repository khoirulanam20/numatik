<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Pernikahan;
use Illuminate\Http\Request;

class PernikahanController extends Controller
{
    public function index()
    {
        return Inertia::render('Pernikahan');
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
        Pernikahan::create($validatedData);

        return redirect()->back()->with('success', 'Data pernikahan berhasil disimpan.');
    }

    public function update(Request $request, Pernikahan $pernikahan)
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

        $pernikahan->update($validatedData);

        return redirect()->back()->with('success', 'Data pernikahan berhasil diperbarui.');
    }

    public function destroy(Pernikahan $pernikahan)
    {
        $pernikahan->delete();
        return redirect()->back()->with('success', 'Data pernikahan berhasil dihapus.');
    }
}