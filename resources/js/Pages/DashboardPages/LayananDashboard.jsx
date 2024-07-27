import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import { useState } from 'react';

export default function LayananDashboard({ auth, pernikahans, ulangTahuns, konserInputs }) {
    const [pernikahanData, setPernikahanData] = useState(pernikahans);
    const [ulangTahunData, setUlangTahunData] = useState(ulangTahuns);
    const [konserData, setKonserData] = useState(konserInputs);

    const handleDelete = async (id, type) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
            try {
                await axios.delete(`/api/${type}/${id}`);
                if (type === 'pernikahans') {
                    setPernikahanData(pernikahanData.filter(item => item.id !== id));
                } else if (type === 'ulang-tahuns') {
                    setUlangTahunData(ulangTahunData.filter(item => item.id !== id));
                } else if (type === 'konser-inputs') {
                    setKonserData(konserData.filter(item => item.id !== id));
                }
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Terjadi kesalahan saat menghapus layanan.');
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Layanan</h2>}
        >
            <Head title="Dashboard Layanan" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Daftar Layanan Pernikahan</h3>
                            
                            {Array.isArray(pernikahanData) && pernikahanData.length > 0 ? (
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Nama Acara</th>
                                                <th scope="col" className="px-6 py-3">Lokasi</th>
                                                <th scope="col" className="px-6 py-3">Tanggal</th>
                                                <th scope="col" className="px-6 py-3">Paket</th>
                                                <th scope="col" className="px-6 py-3">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pernikahanData.map((pernikahan) => (
                                                <tr key={pernikahan.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {pernikahan.nama_acara}
                                                    </th>
                                                    <td className="px-6 py-4">{pernikahan.lokasi}</td>
                                                    <td className="px-6 py-4">{pernikahan.tanggal}</td>
                                                    <td className="px-6 py-4">{pernikahan.paket}</td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => handleEdit(pernikahan)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">
                                                            Edit
                                                        </button>
                                                        <button onClick={() => handleDelete(pernikahan.id, 'pernikahans')} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>Tidak ada data pernikahan yang tersedia.</p>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4 mt-8">Daftar Layanan Ulang Tahun</h3>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Nama Acara</th>
                                            <th scope="col" className="px-6 py-3">Lokasi</th>
                                            <th scope="col" className="px-6 py-3">Tanggal</th>
                                            <th scope="col" className="px-6 py-3">Paket</th>
                                            <th scope="col" className="px-6 py-3">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ulangTahunData.map((ulangTahun) => (
                                            <tr key={ulangTahun.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {ulangTahun.nama_acara}
                                                </th>
                                                <td className="px-6 py-4">{ulangTahun.lokasi}</td>
                                                <td className="px-6 py-4">{ulangTahun.tanggal}</td>
                                                <td className="px-6 py-4">{ulangTahun.paket}</td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => handleEdit(ulangTahun)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(ulangTahun.id, 'ulang-tahuns')} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4 mt-8">Daftar Layanan Konser</h3>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Nama Acara</th>
                                            <th scope="col" className="px-6 py-3">Lokasi</th>
                                            <th scope="col" className="px-6 py-3">Tanggal</th>
                                            <th scope="col" className="px-6 py-3">Paket</th>
                                            <th scope="col" className="px-6 py-3">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {konserData && Array.isArray(konserData) && konserData.map((konserInput) => (
                                            <tr key={konserInput.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {konserInput.nama_acara}
                                                </th>
                                                <td className="px-6 py-4">{konserInput.lokasi}</td>
                                                <td className="px-6 py-4">{konserInput.tanggal}</td>
                                                <td className="px-6 py-4">{konserInput.paket}</td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => handleEdit(konserInput)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(konserInput.id, 'konser-inputs')} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}