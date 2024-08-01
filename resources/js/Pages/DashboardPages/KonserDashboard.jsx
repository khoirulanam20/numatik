import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

export default function KonserDashboard({ auth }) {
    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchConcerts();
    }, []);

    const fetchConcerts = async () => {
        try {
            const response = await axios.get('/api/concerts');
            setConcerts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Terjadi kesalahan saat mengambil data konser.');
            setLoading(false);
        }
    };

    const handleEdit = (concert) => {
        // Implementasi logika edit
        console.log('Edit konser:', concert);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus konser ini?')) {
            try {
                await axios.delete(`/api/concerts/${id}`);
                setConcerts(concerts.filter(concert => concert.id !== id));
            } catch (err) {
                setError('Terjadi kesalahan saat menghapus konser.');
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Konser</h2>}
        >
            <Head title="Dashboard Konser" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Daftar Konser</h3>
                            
                            {loading ? (
                                <p>Memuat data konser...</p>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : (
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Nama Konser</th>
                                                <th scope="col" className="px-6 py-3">Lokasi</th>
                                                <th scope="col" className="px-6 py-3">Tanggal</th>
                                                <th scope="col" className="px-6 py-3">Harga</th>
                                                <th scope="col" className="px-6 py-3">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {concerts.map((concert) => (
                                                <tr key={concert.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {concert.concert_name}
                                                    </th>
                                                    <td className="px-6 py-4">{concert.concert_location}</td>
                                                    <td className="px-6 py-4">{concert.concert_date}</td>
                                                    <td className="px-6 py-4">Rp {concert.concert_price}</td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => handleEdit(concert)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">
                                                            Edit
                                                        </button>
                                                        <button onClick={() => handleDelete(concert.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}