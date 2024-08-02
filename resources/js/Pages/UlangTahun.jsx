import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import CustomNavbar from '@/Components/Navbar';
import CustomFooter from '@/Components/Footer';

export default function UlangTahun({ auth }) {
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
            <div className="min-h-screen flex flex-col  bg-gradient-to-b dark:from-blue-800 dark:to-gray-900 from-blue-400 to-gray-50">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">Ulang Tahun</h1>
                        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">Rayakan momen spesial dengan paket ulang tahun kami.</p>

                        {showAlert && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                                <p className="font-bold">Sukses!</p>
                                <p>Data ulang tahun berhasil disimpan.</p>
                            </div>
                        )}

                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Kolom Kiri - Card Paket Ulang Tahun */}
                            <div className="w-full lg:w-1/2 space-y-6">
                                {[
                                    { title: "Paket 1", description: "Pesta ulang tahun meriah dengan dekorasi, kue, dan hiburan untuk 50 tamu.", price: "Rp 5.000.000" },
                                    { title: "Paket 2", description: "Perayaan hangat dengan dekorasi dan kue untuk 30 tamu.", price: "Rp 3.500.000" },
                                    { title: "Paket 3", description: "Perayaan sederhana namun berkesan untuk 20 tamu.", price: "Rp 2.500.000" }
                                ].map((paket, index) => (
                                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">{paket.title}</h2>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4">{paket.description}</p>
                                            <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">{paket.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Kolom Kanan - Form */}
                            <div className="w-full lg:w-1/2">
                                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Pesan Paket Ulang Tahun</h2>
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

                                    <div className="mb-6">
                                        <label htmlFor="paket" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pilih Paket</label>
                                        <select
                                            id="paket"
                                            name="paket"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            value={data.paket}
                                            onChange={(e) => setData('paket', e.target.value)}
                                            required
                                        >
                                            <option value="">Pilih Paket</option>
                                            <option value="Paket 1">Paket 1</option>
                                            <option value="Paket 2">Paket 2</option>
                                            <option value="Paket 3">Paket 3</option>
                                        </select>
                                        {errors.paket && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.paket}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 disabled:opacity-50"
                                        disabled={processing}
                                    >
                                        {processing ? 'Memproses...' : 'Pesan Sekarang'}
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