<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Concert;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // Tambahkan lebih banyak pengguna
        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        Concert::create([
            'concert_name' => 'Konser Raisa',
            'concert_location' => 'Gelora Bung Karno, Jakarta',
            'concert_date' => '2024-08-15',
            'concert_price' => 500000,
            'concert_image' => '/assets/concert.jpg',
        ]);

        // Tambahkan lebih banyak konser
        Concert::create([
            'concert_name' => 'Konser Tulus',
            'concert_location' => 'Istora Senayan, Jakarta',
            'concert_date' => '2024-09-20',
            'concert_price' => 450000,
            'concert_image' => '/assets/concert_tulus.jpg',
        ]);

        Concert::create([
            'concert_name' => 'Konser Sheila on 7',
            'concert_location' => 'Stadion Maguwoharjo, Yogyakarta',
            'concert_date' => '2024-10-10',
            'concert_price' => 400000,
            'concert_image' => '/assets/concert_sheila.jpg',
        ]);
    }
}