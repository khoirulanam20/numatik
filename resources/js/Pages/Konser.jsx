import React from 'react';
import { Head } from '@inertiajs/react';
import CustomNavbar from '@/Components/Navbar';
import CustomFooter from '@/Components/Footer';

export default function Konser({ auth }) {
    return (
        <>
            <Head title="Konser" />
            <div className="min-h-screen flex flex-col">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-4">Konser</h1>
                        <p>Informasi tentang konser yang akan datang.</p>
                    </div>
                </main>
                <CustomFooter />
            </div>
        </>
    );
}