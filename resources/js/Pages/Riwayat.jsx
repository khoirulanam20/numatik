import React from 'react';
import { Head } from '@inertiajs/react';
import CustomNavbar from '@/Components/Navbar';
import CustomFooter from '@/Components/Footer';

export default function Riwayat({ auth }) {
    return (
        <>
            <Head title="Riwayat" />
            <div className="min-h-screen flex flex-col">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-4">Riwayat</h1>
                        <p>Halaman riwayat transaksi Anda.</p>
                    </div>
                </main>
                <CustomFooter />
            </div>
        </>
    );
}
