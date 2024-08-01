import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';

export default function TiketKonserDashboard({ auth, tickets }) {
    const [selectedTickets, setSelectedTickets] = useState({});
    const [ticketData, setTicketData] = useState(tickets);
    const { csrf_token } = usePage().props;

    useEffect(() => {
        const initialSelectedTickets = tickets.reduce((acc, ticket) => {
            acc[ticket.id] = ticket.status === 'settlement' ? 1 : 0;
            return acc;
        }, {});
        setSelectedTickets(initialSelectedTickets);
    }, [tickets]);

    const handleCheckboxChange = async (ticketId, isChecked) => {
        try {
            const value = isChecked ? 'settlement' : 'pending';
            const response = await axios.put(`/api/tickets/${ticketId}/update-status`, 
                { status: value },
                {
                    headers: {
                        'X-CSRF-TOKEN': csrf_token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }
            );

            console.log('Response:', response.data);

            setSelectedTickets((prevSelectedTickets) => ({
                ...prevSelectedTickets,
                [ticketId]: isChecked ? 1 : 0,
            }));

            setTicketData((prevTicketData) =>
                prevTicketData.map((ticket) =>
                    ticket.id === ticketId ? { ...ticket, status: value } : ticket
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
            alert("Terjadi kesalahan saat memperbarui status. Silakan coba lagi.");
        }
    };

    const handleBulkAction = () => {
        // Implementasi aksi bulk (misalnya, hapus atau ubah status)
        console.log('Selected Tickets:', selectedTickets);
    };

    const renderConcertTable = (tickets) => (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const newSelectedTickets = {};
                                    tickets.forEach((ticket) => {
                                        newSelectedTickets[ticket.id] = isChecked ? 1 : 0;
                                    });
                                    setSelectedTickets(newSelectedTickets);
                                }}
                            />
                        </th>
                        <th scope="col" className="px-6 py-3">Nama Konser</th>
                        <th scope="col" className="px-6 py-3">Lokasi</th>
                        <th scope="col" className="px-6 py-3">Tanggal</th>
                        <th scope="col" className="px-6 py-3">Harga</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets && tickets.map((ticket) => (
                        <tr key={ticket.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedTickets[ticket.id] === 1}
                                        onChange={(e) => handleCheckboxChange(ticket.id, e.target.checked)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {ticket.concert.concert_name}
                            </th>
                            <td className="px-6 py-4">{ticket.concert.concert_location}</td>
                            <td className="px-6 py-4">{ticket.concert.concert_date}</td>
                            <td className="px-6 py-4">Rp {ticket.concert.concert_price.toLocaleString('id-ID')}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.status === 'settlement' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {ticket.status === 'settlement' ? 'Terbayar' : 'Menunggu Pembayaran'}
                                </span>
                            </td>
                            <td className="px-6 py-4">{ticket.user?.email || 'Tidak ada email'}</td>
                            <td className="px-6 py-4">{ticket.id}</td>
                            <td className="px-6 py-4">
                                {ticket.status === 'settlement' ? (
                                    <a
                                        href={route('riwayat.downloadTicket', ticket.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Unduh Tiket
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => handlePayment(ticket.id)}
                                        className="font-medium text-green-600 dark:text-green-500 hover:underline"
                                    >
                                        Bayar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

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
                                <>
                                    {renderConcertTable(ticketData)}
                                    <button
                                        onClick={handleBulkAction}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                                    >
                                        Aksi Bulk
                                    </button>
                                </>
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