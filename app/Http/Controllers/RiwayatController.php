<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ConcertTicket;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;
use App\Models\KonserInput;
use App\Models\UlangTahun;
use App\Models\Pernikahan;

class RiwayatController extends Controller
{
    protected $pernikahanController;
    protected $ulangTahunController;
    protected $konserInputController;

    public function __construct(
        PernikahanController $pernikahanController,
        UlangTahunController $ulangTahunController,
        KonserInputController $konserInputController
    ) {
        $this->pernikahanController = $pernikahanController;
        $this->ulangTahunController = $ulangTahunController;
        $this->konserInputController = $konserInputController;
    }

    public function index()
    {
        $user = auth()->user();

        $pernikahans = $this->pernikahanController->getUserPernikahans($user->id);
        $ulangTahuns = $this->ulangTahunController->getUserUlangTahuns($user->id);
        $konserInputs = $this->konserInputController->getUserKonserInputs($user->id);

        $concertTickets = ConcertTicket::with('concert')
            ->where('user_id', $user->id)
            ->get();

        Log::info('Riwayat data:', [
            'pernikahans' => $pernikahans,
            'ulangTahuns' => $ulangTahuns,
            'konserInputs' => $konserInputs,
            'concertTickets' => $concertTickets
        ]);

        return Inertia::render('Riwayat', [
            'pernikahans' => $pernikahans,
            'ulangTahuns' => $ulangTahuns,
            'konserInputs' => $konserInputs,
            'concertTickets' => $concertTickets
        ]);
    }

    public function downloadTicket($ticketId)
    {
        $ticket = ConcertTicket::with('concert')->findOrFail($ticketId);
        $pdf = Pdf::loadView('pdf.concert-ticket', compact('ticket'));
        return $pdf->download('tiket_konser.pdf');
    }

    public function updateKonser(Request $request, $id)
    {
        $konserInput = KonserInput::findOrFail($id);
        $konserInput->update($request->all());
        return redirect()->back()->with('success', 'Data konser berhasil diperbarui.');
    }

    public function destroyKonser($id)
    {
        $konserInput = KonserInput::findOrFail($id);
        $konserInput->delete();
        return redirect()->back()->with('success', 'Data konser berhasil dihapus.');
    }

    public function updateUlangTahun(Request $request, $id)
    {
        $ulangTahun = \App\Models\UlangTahun::findOrFail($id);
        $ulangTahun->update($request->all());
        return redirect()->back()->with('success', 'Data ulang tahun berhasil diperbarui.');
    }

    public function updatePernikahan(Request $request, $id)
    {
        $pernikahan = \App\Models\Pernikahan::findOrFail($id);
        $pernikahan->update($request->all());
        return redirect()->back()->with('success', 'Data pernikahan berhasil diperbarui.');
    }

    public function destroyUlangTahun($id)
    {
        $ulangTahun = \App\Models\UlangTahun::findOrFail($id);
        $ulangTahun->delete();
        return redirect()->back()->with('success', 'Data ulang tahun berhasil dihapus.');
    }

    public function destroyPernikahan($id)
    {
        $pernikahan = \App\Models\Pernikahan::findOrFail($id);
        $pernikahan->delete();
        return redirect()->back()->with('success', 'Data pernikahan berhasil dihapus.');
    }

    public function toggleComplete(Request $request, $id)
    {
        $ulangTahun = \App\Models\UlangTahun::findOrFail($id);
        $ulangTahun->status = !$ulangTahun->status;
        $ulangTahun->save();
        return redirect()->back()->with('success', 'Status ulang tahun berhasil diperbarui.');
    }
}