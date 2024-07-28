<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Concert;
use Illuminate\Http\Request;

class ConcertController extends Controller
{
    public function index()
    {
        return Inertia::render('Concert');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'concert_name' => 'required|string|max:255',
            'concert_location' => 'required|string|max:255',
            'concert_date' => 'required|date',
            'concert_price' => 'required|numeric',
            'concert_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'id_user' => 'required|exists:users,id', // Pastikan id_user divalidasi
        ]);

        $concert = new Concert($validatedData);

        if ($request->hasFile('concert_image')) {
            $path = $request->file('concert_image')->store('concert_images', 'public');
            $concert->concert_image = $path;
        }

        $concert->save();

        return response()->json(['message' => 'Concert created successfully', 'concert' => $concert], 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'concert_name' => 'required|string|max:255',
            'concert_location' => 'required|string|max:255',
            'concert_date' => 'required|date',
            'concert_price' => 'required|numeric',
            'concert_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $concert = Concert::findOrFail($id);
        $concert->update($validatedData);

        if ($request->hasFile('concert_image')) {
            $path = $request->file('concert_image')->store('concert_images', 'public');
            $concert->concert_image = $path;
        }

        $concert->save();

        return response()->json(['message' => 'Concert updated successfully', 'concert' => $concert]);
    }

    public function destroy($id)
    {
        $concert = Concert::findOrFail($id);
        $concert->delete();

        return response()->json(['message' => 'Concert deleted successfully']);
    }

    public function getAllConcerts()
    {
        $concerts = Concert::all();
        return response()->json($concerts);
    }
}