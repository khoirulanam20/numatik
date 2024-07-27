<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\KonserInput;
use App\Models\UlangTahun;
use App\Models\Pernikahan;

class RiwayatController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $konserInputs = $user->konserInputs;
        $ulangTahuns = $user->ulangTahuns;
        $pernikahans = $user->pernikahans;

        return Inertia::render('Riwayat', [
            'konserInputs' => $konserInputs,
            'ulangTahuns' => $ulangTahuns,
            'pernikahans' => $pernikahans,
        ]);
    }

    public function updateKonser(Request $request, KonserInput $konserInput)
    {
        if (auth()->id() !== $konserInput->id_user) {
            abort(403, 'Unauthorized action.');
        }
        
        $validatedData = $request->validate([
            'nama_acara' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'deskripsi' => 'required',
            'nomor_hp' => 'required',
            'atas_nama' => 'required',
            'paket' => 'required',
        ]);

        $konserInput->update($validatedData);
        return redirect()->back()->with('message', 'Konser berhasil diperbarui');
    }

    public function updatePernikahan(Request $request, Pernikahan $pernikahan)
    {
        if (auth()->id() !== $pernikahan->id_user) {
            abort(403, 'Unauthorized action.');
        }
        
        $validatedData = $request->validate([
            'nama_acara' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'atas_nama' => 'required',
            'paket' => 'required',
        ]);

        $pernikahan->update($validatedData);
        return redirect()->back()->with('message', 'Pernikahan berhasil diperbarui');
    }

    public function destroyKonser(KonserInput $konserInput)
    {
        if (auth()->id() !== $konserInput->id_user) {
            abort(403, 'Unauthorized action.');
        }
        
        $konserInput->delete();
        return redirect()->back()->with('message', 'Konser berhasil dihapus');
    }

    public function destroyPernikahan(Pernikahan $pernikahan)
    {
        if (auth()->id() !== $pernikahan->id_user) {
            abort(403, 'Unauthorized action.');
        }
        
        $pernikahan->delete();
        return redirect()->back()->with('message', 'Pernikahan berhasil dihapus');
    }
}