import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import CustomNavbar from "@/Components/Navbar";
import CustomFooter from "@/Components/Footer";
import axios from 'axios';

export default function TiketKonser({ auth, concerts = [] }) {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedConcert, setSelectedConcert] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [snapToken, setSnapToken] = useState(null);

    useEffect(() => {
        // Inisialisasi Midtrans Snap
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        }
    }, []);

    const handleBuyTicket = async (concert) => {
        if (!auth.user) {
            alert('Silakan login terlebih dahulu untuk membeli tiket.');
            return;
        }

        setIsLoading(true);
        setSelectedConcert(concert);
        try {
            const response = await axios.post(route('payment.process', concert.id));
            if (response.data.snap_token) {
                setSnapToken(response.data.snap_token);
                setShowModal(true);
            } else {
                throw new Error('Token Snap tidak ditemukan dalam respons');
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

    const handlePayment = () => {
        if (snapToken) {
            window.snap.pay(snapToken, {
                onSuccess: function(result){
                    alert('Pembayaran berhasil!');
                    setShowModal(false);
                    // Refresh halaman atau update state sesuai kebutuhan
                    window.location.reload();
                },
                onPending: function(result){
                    alert('Pembayaran tertunda, silakan selesaikan pembayaran Anda.');
                    setShowModal(false);
                },
                onError: function(result){
                    alert('Pembayaran gagal, silakan coba lagi.');
                    setShowModal(false);
                },
                onClose: function(){
                    setShowModal(false);
                }
            });
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

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">Pembayaran Tiket</h2>
                            <p className="mb-4">Anda akan membeli tiket untuk konser: {selectedConcert?.concert_name}</p>
                            <p className="mb-6">Harga: Rp {selectedConcert?.concert_price.toLocaleString()}</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition duration-300"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handlePayment}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                                >
                                    Bayar Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}