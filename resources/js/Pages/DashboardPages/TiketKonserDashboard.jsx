import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function TiketKonserDashboard({ auth, tickets }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tiket Konser Anda</h2>}
        >
            <Head title="Tiket Konser Anda" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {tickets.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {tickets.map((ticket) => (
                                        <div key={ticket.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                            <div className="p-5">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{ticket.concert.concert_name}</h5>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    <strong>Lokasi Konser:</strong> {ticket.concert.concert_location}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    <strong>Tanggal Konser:</strong> {ticket.concert.concert_date}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    <strong>Harga:</strong> Rp {ticket.concert.concert_price.toLocaleString('id-ID')}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    <strong>Pembeli:</strong> {auth.user.name}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    <strong>Tanggal Pembelian:</strong> {new Date(ticket.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    <strong>Status:</strong> 
                                                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        ticket.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {ticket.status === 'paid' ? 'Terbayar' : 'Menunggu Pembayaran'}
                                                    </span>
                                                </p>
                                                {ticket.status === 'paid' && (
                                                    <a
                                                        href={route('riwayat.downloadTicket', ticket.id)}
                                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Unduh Tiket
                                                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">Anda belum memiliki tiket konser yang berhasil dibeli.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}