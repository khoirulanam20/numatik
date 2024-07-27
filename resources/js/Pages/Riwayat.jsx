import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import CustomNavbar from '@/Components/Navbar';
import CustomFooter from '@/Components/Footer';
import axios from 'axios';

export default function Riwayat({ auth, konserInputs, ulangTahuns, pernikahans }) {
    const [editingItem, setEditingItem] = useState(null);
    const { data, setData, put, delete: destroy, processing, errors } = useForm({
        nama_acara: '',
        lokasi: '',
        tanggal: '',
        deskripsi: '',
        nomor_hp: '',
        atas_nama: '',
        paket: '',
        id_user: auth.user.id,
    });

    const handleEdit = (item, type) => {
        setEditingItem({ ...item, type });
        setData({
            nama_acara: item.nama_acara,
            lokasi: item.lokasi,
            tanggal: item.tanggal,
            deskripsi: item.deskripsi,
            nomor_hp: item.nomor_hp,
            atas_nama: item.atas_nama,
            paket: item.paket,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route(`riwayat.update${editingItem.type}`, editingItem.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditingItem(null);
            },
        });
    };

    const handleDelete = (item, type) => {
        if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            destroy(route(`riwayat.destroy${type}`, item.id), {
                preserveScroll: true,
            });
        }
    };

    const renderTable = (items, type) => (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nama Acara</th>
                        <th scope="col" className="px-6 py-3">Lokasi</th>
                        <th scope="col" className="px-6 py-3">Tanggal</th>
                        <th scope="col" className="px-6 py-3">Paket</th>
                        <th scope="col" className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item) => (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.nama_acara}
                            </th>
                            <td className="px-6 py-4">{item.lokasi}</td>
                            <td className="px-6 py-4">{item.tanggal}</td>
                            <td className="px-6 py-4">{item.paket}</td>
                            <td className="px-6 py-4 space-x-2">
                                <button onClick={() => handleEdit(item, type)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => handleDelete(item, type)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <>
            <Head title="Riwayat" />
            <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl font-bold mb-2 text-left text-gray-800 dark:text-white  ">Riwayat Pesanan</h1>
                        
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Konser</h2>
                                {renderTable(konserInputs, 'Konser')}
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Ulang Tahun</h2>
                                {renderTable(ulangTahuns, 'UlangTahun')}
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Pernikahan</h2>
                                {renderTable(pernikahans, 'Pernikahan')}
                            </section>
                        </div>

                        {editingItem && (
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setEditingItem(null)}>
                                <div className="relative top-20 mx-auto p-8 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-gray-800" onClick={e => e.stopPropagation()}>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Edit {editingItem.type}</h3>
                                    <form onSubmit={handleUpdate} className="space-y-4">
                                        <div>
                                            <label htmlFor="nama_acara" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Acara</label>
                                            <input
                                                id="nama_acara"
                                                type="text"
                                                value={data.nama_acara}
                                                onChange={(e) => setData('nama_acara', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lokasi</label>
                                            <input
                                                id="lokasi"
                                                type="text"
                                                value={data.lokasi}
                                                onChange={(e) => setData('lokasi', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal</label>
                                            <input
                                                id="tanggal"
                                                type="date"
                                                value={data.tanggal}
                                                onChange={(e) => setData('tanggal', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                                            <textarea
                                                id="deskripsi"
                                                value={data.deskripsi}
                                                onChange={(e) => setData('deskripsi', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                rows="3"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="nomor_hp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor HP</label>
                                            <input
                                                id="nomor_hp"
                                                type="text"
                                                value={data.nomor_hp}
                                                onChange={(e) => setData('nomor_hp', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="atas_nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Atas Nama</label>
                                            <input
                                                id="atas_nama"
                                                type="text"
                                                value={data.atas_nama}
                                                onChange={(e) => setData('atas_nama', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="paket" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Paket</label>
                                            <select
                                                id="paket"
                                                value={data.paket}
                                                onChange={(e) => setData('paket', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                                <option value="">Pilih Paket</option>
                                                <option value="Paket1">Paket 1</option>
                                                <option value="Paket2">Paket 2</option>
                                                <option value="Paket3">Paket 3</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button 
                                                type="button" 
                                                onClick={() => setEditingItem(null)} 
                                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300"
                                            >
                                                Batal
                                            </button>
                                            <button 
                                                type="submit" 
                                                disabled={processing} 
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 disabled:opacity-50"
                                            >
                                                {processing ? 'Menyimpan...' : 'Simpan'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
                <CustomFooter />
            </div>
        </>
    );
}