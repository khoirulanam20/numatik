import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import CustomNavbar from '@/Components/Navbar';
import CustomFooter from '@/Components/Footer';

export default function Pernikahan({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_acara: '',
        lokasi: '',
        tanggal: '',
        deskripsi: '',
        nomor_hp: '',
        atas_nama: '',
        paket: '',
        id_user: auth?.user?.id || '',
    });

    useEffect(() => {
        if (!auth.user) {
            alert('Silakan login terlebih dahulu untuk mengakses halaman ini.');
            window.location.href = route('login');
        }
    }, [auth.user]);

    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pernikahans.store'), {
            onSuccess: () => {
                setShowAlert(true);
                reset();
                setTimeout(() => setShowAlert(false), 3000);
            },
        });
    };

    return (
        <>
            <Head title="Pernikahan" />
            <div className="min-h-screen flex flex-col  bg-gradient-to-b dark:from-blue-800 dark:to-gray-900 from-blue-400 to-gray-50">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Pernikahan</h1>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">Informasi tentang Pernikahan yang akan datang.</p>

                        {showAlert && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <strong className="font-bold">Berhasil! </strong>
                                <span className="block sm:inline">Data pernikahan berhasil disimpan.</span>
                            </div>
                        )}

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Kolom Kiri - Card Paket Pernikahan */}
                            <div className="w-full lg:w-1/2">
                                {[
                                    { title: "Paket 1", description: "Paket pernikahan eksklusif dengan dekorasi mewah, catering untuk 300 tamu, dan hiburan live band.", price: "Rp 75.000.000" },
                                    { title: "Paket 2", description: "Paket pernikahan lengkap dengan dekorasi elegan, catering untuk 200 tamu, dan hiburan DJ.", price: "Rp 50.000.000" },
                                    { title: "Paket 3", description: "Paket pernikahan menengah dengan dekorasi cantik, catering untuk 150 tamu, dan hiburan akustik.", price: "Rp 35.000.000" },
                                ].map((paket, index) => (
                                    <div key={index} className="mb-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">{paket.title}</h2>
                                        <p className="mb-3 text-gray-600 dark:text-gray-300">{paket.description}</p>
                                        <p className="font-bold text-blue-600 dark:text-blue-400">{paket.price}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Kolom Kanan - Form */}
                            <div className="w-full lg:w-1/2">
                                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Pesan Paket Pernikahan</h2>
                                    {[
                                        { name: "nama_acara", label: "Nama Acara", type: "text" },
                                        { name: "lokasi", label: "Lokasi", type: "text" },
                                        { name: "tanggal", label: "Tanggal", type: "date" },
                                        { name: "deskripsi", label: "Deskripsi Singkat", type: "textarea" },
                                        { name: "nomor_hp", label: "Nomor HP", type: "tel" },
                                        { name: "atas_nama", label: "Atas Nama", type: "text" },
                                    ].map((field) => (
                                        <div key={field.name} className="mb-4">
                                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                {field.label}
                                            </label>
                                            {field.type === "textarea" ? (
                                                <textarea
                                                    id={field.name}
                                                    name={field.name}
                                                    rows="3"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    value={data[field.name]}
                                                    onChange={(e) => setData(field.name, e.target.value)}
                                                    required
                                                ></textarea>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    id={field.name}
                                                    name={field.name}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    value={data[field.name]}
                                                    onChange={(e) => setData(field.name, e.target.value)}
                                                    required
                                                />  
                                            )}
                                            {errors[field.name] && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors[field.name]}</p>}
                                        </div>
                                    ))}

                                    <div className="mb-4">
                                        <label htmlFor="paket" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paket</label>
                                        <select
                                            id="paket"
                                            name="paket"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            value={data.paket}
                                            onChange={(e) => setData('paket', e.target.value)}
                                            required
                                        >
                                            <option value="">Pilih Paket</option>
                                            <option value="paket 1">Paket 1</option>
                                            <option value="paket 2">Paket 2</option>
                                            <option value="paket 3">Paket 3</option>
                                        </select>
                                        {errors.paket && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.paket}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 disabled:opacity-50"
                                        disabled={processing}
                                    >
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