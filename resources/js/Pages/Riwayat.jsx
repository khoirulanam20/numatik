import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import CustomNavbar from '@/Components/Navbar';
import CustomFooter from '@/Components/Footer';

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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
            <table className="w-full text-sm text-left text-gray-500 px-4 py-4 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nama Acara</th>
                        <th scope="col" className="px-6 py-3">Lokasi</th>
                        <th scope="col" className="px-6 py-3">Tanggal</th>
                        <th scope="col" className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item) => (
                        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-600 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-100">
                                {item.nama_acara}
                            </th>
                            <td className="px-6 py-4">{item.lokasi}</td>
                            <td className="px-6 py-4">{item.tanggal}</td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleEdit(item, type)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</button>
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
            <div className="min-h-screen flex flex-col">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8 mt-8 rounded-md bg-gray-400 mb-4 dark:bg-gray-900">
                        <h1 className="text-3xl text-gray-700 dark:text-white font-bold mb-4">Riwayat</h1>
                        
                        <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-700 dark:text-white">Konser</h2>
                        {renderTable(konserInputs, 'Konser')}

                        <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-700 dark:text-white">Ulang Tahun</h2>
                        {renderTable(ulangTahuns, 'UlangTahun')}

                        <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-700 dark:text-white">Pernikahan</h2>
                        {renderTable(pernikahans, 'Pernikahan')}

                        {editingItem && (
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                                    <h3 className="text-lg font-bold mb-4">Edit {editingItem.type}</h3>
                                    <form onSubmit={handleUpdate}>
                                        <input
                                            type="text"
                                            value={data.nama_acara}
                                            onChange={(e) => setData('nama_acara', e.target.value)}
                                            className="w-full p-2 mb-2 border rounded"
                                            placeholder="Nama Acara"
                                        />
                                        <input
                                            type="text"
                                            value={data.lokasi}
                                            onChange={(e) => setData('lokasi', e.target.value)}
                                            className="w-full p-2 mb-2 border rounded"
                                            placeholder="Lokasi"
                                        />
                                        <input
                                            type="date"
                                            value={data.tanggal}
                                            onChange={(e) => setData('tanggal', e.target.value)}
                                            className="w-full p-2 mb-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            value={data.deskripsi}
                                            onChange={(e) => setData('deskripsi', e.target.value)}
                                            className="w-full p-2 mb-2 border rounded"
                                            placeholder="Deskripsi"
                                        />
                                        <input
                                            type="text"
                                            value={data.nomor_hp}
                                            onChange={(e) => setData('nomor_hp', e.target.value)}
                                            className="w-full p-2 mb-2 border rounded"
                                            placeholder="Nomor HP"
                                        />
                                        <input
                                            type="text"
                                            value={data.atas_nama}
                                            onChange={(e) => setData('atas_nama', e.target.value)}
                                            className="w-full p-2 mb-2 border rounded"
                                            placeholder="Atas Nama"
                                        />
                                        <input
                                            type="text"
                                            value={data.paket}
                                            onChange={(e) => setData('paket', e.target.value)}
                                            className="w-full p-2 mb-2 border rounded"
                                            placeholder="Paket"
                                        />
                                        <div className="flex justify-end">
                                            <button type="button" onClick={() => setEditingItem(null)} className="mr-2 px-4 py-2 bg-gray-300 rounded">Batal</button>
                                            <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-500 text-white rounded">
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