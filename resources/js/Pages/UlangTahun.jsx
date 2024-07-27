import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import CustomNavbar from '@/Components/Navbar';
import CustomFooter from '@/Components/Footer';
import { useState } from 'react';

export default function UlangTahun({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_acara: '',
        lokasi: '',
        tanggal: '',
        deskripsi: '',
        nomor_hp: '',
        atas_nama: '',
        paket: '',
        id_user: auth.user.id,
    });

    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('ulang-tahuns.store'), {
            onSuccess: () => {
                setShowAlert(true);
                reset();
                setTimeout(() => setShowAlert(false), 3000);
            },
        });
    };

    return (
        <>
            <Head title="Ulang Tahun" />
            <div className="min-h-screen flex flex-col">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-4">Ulang Tahun</h1>
                        <p className="mb-6">Informasi tentang Ulang Tahun yang akan datang.</p>

                        {showAlert && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <strong className="font-bold">Berhasil! </strong>
                                <span className="block sm:inline">Data ulang tahun berhasil disimpan.</span>
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Kolom Kiri - Card Paket Ulang Tahun */}
                            <div className="w-full md:w-1/2">
                                {/* Card 1 */}
                                <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
                                    <h2 className="mb-2 text-2xl font-bold">Paket 1</h2>
                                    <p className="mb-3 text-gray-700">Nikmati penampilan band rock terbaik dalam satu malam yang epik!</p>
                                    <p className="font-bold">Harga: Rp 500.000</p>
                                </div>

                                {/* Card 2 */}
                                <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
                                    <h2 className="mb-2 text-2xl font-bold">Paket 2</h2>
                                    <p className="mb-3 text-gray-700">Rasakan alunan jazz yang menenangkan dari musisi terkenal.</p>
                                    <p className="font-bold">Harga: Rp 450.000</p>
                                </div>

                                {/* Card 3 */}
                                <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
                                    <h2 className="mb-2 text-2xl font-bold">Paket 3</h2>
                                    <p className="mb-3 text-gray-700">Saksikan penyanyi pop favorit Anda dalam Ulang Tahun yang meriah!</p>
                                    <p className="font-bold">Harga: Rp 550.000</p>
                                </div>
                            </div>

                            {/* Kolom Kanan - Form */}
                            <div className="w-full md:w-1/3">
                                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
                                    <div className="mb-4">
                                        <label htmlFor="nama_acara" className="block text-sm font-medium text-gray-700">Nama Acara</label>
                                        <input type="text" id="nama_acara" name="nama_acara" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={data.nama_acara} onChange={(e) => setData('nama_acara', e.target.value)} required />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700">Lokasi</label>
                                        <input type="text" id="lokasi" name="lokasi" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={data.lokasi} onChange={(e) => setData('lokasi', e.target.value)} required />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">Tanggal</label>
                                        <input 
                                            type="date" 
                                            id="tanggal" 
                                            name="tanggal" 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-700 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[39%] [&::-webkit-calendar-picker-indicator]:sepia-[6%] [&::-webkit-calendar-picker-indicator]:saturate-[2084%] [&::-webkit-calendar-picker-indicator]:hue-rotate-[187deg] [&::-webkit-calendar-picker-indicator]:brightness-[93%] [&::-webkit-calendar-picker-indicator]:contrast-[86%]" 
                                            value={data.tanggal} 
                                            onChange={(e) => setData('tanggal', e.target.value)} 
                                            required 
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi Singkat</label>
                                        <textarea id="deskripsi" name="deskripsi" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} required></textarea>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="nomor_hp" className="block text-sm font-medium text-gray-700">Nomor HP</label>
                                        <input type="tel" id="nomor_hp" name="nomor_hp" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={data.nomor_hp} onChange={(e) => setData('nomor_hp', e.target.value)} required />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="atas_nama" className="block text-sm font-medium text-gray-700">Atas Nama</label>
                                        <input type="text" id="atas_nama" name="atas_nama" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={data.atas_nama} onChange={(e) => setData('atas_nama', e.target.value)} required />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="paket" className="block text-sm font-medium text-gray-700">Paket</label>
                                        <select id="paket" name="paket" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={data.paket} onChange={(e) => setData('paket', e.target.value)} required>
                                            <option value="">Pilih Paket</option>
                                            <option value="paket1">Paket 1</option>
                                            <option value="paket2">Paket 2</option>
                                            <option value="paket3">Paket 3</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" disabled={processing}>
                                        {processing ? 'Mengirim...' : 'Kirim'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <CustomFooter />
            </div>
        </>
    );
}