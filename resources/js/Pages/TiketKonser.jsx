import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import CustomNavbar from "@/Components/Navbar";
import CustomFooter from "@/Components/Footer";
import axios from 'axios';

export default function TiketKonser({ auth }) {
    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchConcerts();
    }, []);

    const fetchConcerts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/concerts');
            console.log('API response:', response.data); // Tambahkan log ini
            if (Array.isArray(response.data) && response.data.length > 0) {
                setConcerts(response.data);
            } else if (typeof response.data === 'object' && response.data.data) {
                // Jika data berada dalam properti 'data'
                setConcerts(response.data.data);
            } else {
                setError('Data konser tidak valid atau kosong');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching concerts:', error);
            setError('Terjadi kesalahan saat mengambil data konser.');
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Tiket Konser" />
            <div className="min-h-screen flex flex-col">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow">
                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none mt-8 text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                                We invest in the world's potential
                            </h1>
                            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                                Here at Flowbite we focus on markets where
                                technology, innovation, and capital can unlock
                                long-term value and drive economic growth.
                            </p>
                        </div>
                    </section>

                    <div className="container mx-auto px-4 m-4 py-8">
                        <h1 className="text-3xl font-bold mb-4">
                            TIKET KONSER
                        </h1>
                        <p className="mb-6">
                            Pilih tiket konser yang Anda inginkan.
                        </p>

                        {loading ? (
                            <p>Memuat data konser...</p>
                        ) : error ? (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        ) : Array.isArray(concerts) && concerts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {concerts.map((concert) => (
                                    <div
                                        key={concert.id}
                                        className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <a href="#">
                                            <img
                                                className="p-8 rounded-t-lg w-full h-64 object-cover"
                                                src={concert.concert_image ? `/storage/${concert.concert_image}` : "/assets/concert.jpg"}
                                                alt={concert.concert_name || "Konser"}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/assets/concert.jpg";
                                                }}
                                            />
                                        </a>
                                        <div className="px-5 pb-5">
                                            <a href="#">
                                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                    {concert.concert_name || "Nama Konser Tidak Tersedia"}
                                                </h5>
                                            </a>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                {concert.concert_date || "Tanggal Tidak Tersedia"} - {concert.concert_location || "Lokasi Tidak Tersedia"}
                                            </p>
                                            <div className="flex items-center justify-between mt-4">
                                                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                    {concert.concert_price ? `Rp ${Number(concert.concert_price).toLocaleString()}` : 'Harga Tidak Tersedia'}
                                                </span>
                                                <a
                                                    href="#"
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    Beli Tiket
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Tidak ada data konser yang tersedia.</p>
                        )}
                    </div>


                </main>
                <CustomFooter />
            </div>
        </>
    );
}