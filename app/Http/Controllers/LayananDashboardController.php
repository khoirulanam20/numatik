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
        $user = auth()->user();
        $pernikahans = Pernikahan::with('user')->where('id_user', $user->id)->get();
        $ulangTahuns = UlangTahun::with('user')->where('id_user', $user->id)->get();
        $konserInputs = KonserInput::with('user')->where('id_user', $user->id)->get();
        return Inertia::render('DashboardPages/LayananDashboard', [
            'pernikahans' => $pernikahans,
            'ulangTahuns' => $ulangTahuns,
            'konserInputs' => $konserInputs
        ]);
    }

    public function updateStatus(Request $request, $type, $id)
    {
        try {
            \Illuminate\Support\Facades\Log::info('Update status request received', ['type' => $type, 'id' => $id, 'status' => $request->input('status')]);
            
            $model = $this->getModelByType($type);
            $item = $model::findOrFail($id);
            $item->status = $request->input('status');
            $item->save();

            return response()->json(['message' => 'Status berhasil diperbarui']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error updating status: ' . $e->getMessage());
            \Illuminate\Support\Facades\Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json(['error' => 'Terjadi kesalahan saat memperbarui status'], 500);
        }
    }

    private function getModelByType($type)
    {
        switch ($type) {
            case 'pernikahans':
                return Pernikahan::class;
            case 'ulangTahuns':
                return UlangTahun::class;
            case 'konserInputs':
                return KonserInput::class;
            default:
                throw new \Exception("Invalid type");
        }
    }
}