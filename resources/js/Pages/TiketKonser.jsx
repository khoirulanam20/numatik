import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import CustomNavbar from "@/Components/Navbar";
import CustomFooter from "@/Components/Footer";
import axios from 'axios';

export default function TiketKonser({ auth, concerts = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedConcert, setSelectedConcert] = useState(null);

    const handleBuyTicket = async (concert) => {
        if (!auth.user) {
            alert('Silakan login terlebih dahulu untuk membeli tiket.');
            return;
        }

        setIsLoading(true);
        setSelectedConcert(concert);
        try {
            const response = await axios.post(route('payment.process', concert.id));
            if (response.data.paymentUrl) {
                setPaymentUrl(response.data.paymentUrl);
                setIsModalOpen(true);
            } else {
                throw new Error('URL pembayaran tidak ditemukan dalam respons');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            let errorMessage = 'Terjadi kesalahan dalam memproses pembayaran.';
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage += ' ' + error.response.data.error;
            }
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        if (confirm('Anda yakin ingin menutup jendela pembayaran? Pembayaran Anda belum selesai.')) {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <Head title="Tiket Konser" />
            <div className="min-h-screen flex flex-col">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">TIKET KONSER</h1>
                    <p className="text-xl mb-8 text-center">Pilih tiket konser yang Anda inginkan.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {concerts && concerts.length > 0 ? (
                            concerts.map((concert) => (
                                <div key={concert.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                                    <img className="w-full h-48 object-cover" src={`/storage/${concert.concert_image}`} alt={concert.concert_name} onError={(e) => e.target.src = '/images/default-concert.jpg'} />
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{concert.concert_name}</h2>
                                        <p className="text-gray-600 mb-4">
                                            <span className="font-semibold">Lokasi:</span> {concert.concert_location}<br />
                                            <span className="font-semibold">Tanggal:</span> {concert.concert_date}<br />
                                            <span className="font-semibold">Harga:</span> Rp {concert.concert_price.toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => handleBuyTicket(concert)}
                                            disabled={isLoading}
                                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                                        >
                                            {isLoading ? 'Memproses...' : 'Beli Tiket'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 text-lg">Tidak ada konser yang tersedia saat ini.</p>
                        )}
                    </div>
                </main>
                <CustomFooter />
            </div>

            {isModalOpen && selectedConcert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full transform transition-transform duration-300 scale-100">
                        <h2 className="text-2xl font-bold mb-4">Pembayaran Tiket Konser</h2>
                        <p className="mb-2"><strong>Konser:</strong> {selectedConcert.concert_name}</p>
                        <p className="mb-2"><strong>Tanggal:</strong> {selectedConcert.concert_date}</p>
                        <p className="mb-4"><strong>Harga:</strong> Rp {selectedConcert.concert_price.toLocaleString()}</p>
                        <p className="mb-4">Klik tombol di bawah untuk melanjutkan ke halaman pembayaran:</p>
                        <div className="flex justify-between">
                            <a
                                href={paymentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                            >
                                Lanjutkan ke Pembayaran
                            </a>
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}