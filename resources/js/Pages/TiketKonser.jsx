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
            <div className="min-h-screen flex flex-col  bg-gradient-to-b dark:from-blue-800 dark:to-gray-900 from-blue-400 to-gray-50">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl font-bold mb-2 text-left text-gray-800 dark:text-white">Tiket Konser</h1>
                        <p className="text-xl mb-8 text-left text-gray-600 dark:text-gray-300">Pilih tiket konser yang Anda inginkan.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {concerts && concerts.length > 0 ? (
                                concerts.map((concert) => (
                                    <div key={concert.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                                        <img className="w-full h-56 object-cover object-center" src={`/storage/${concert.concert_image}`} alt={concert.concert_name} onError={(e) => e.target.src = '/images/default-concert.jpg'} />
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">{concert.concert_name}</h2>
                                            <div className="space-y-2 mb-4">
                                                <p className="flex items-center text-gray-600 dark:text-gray-300">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                    {concert.concert_location}
                                                </p>
                                                <p className="flex items-center text-gray-600 dark:text-gray-300">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    {concert.concert_date}
                                                </p>
                                                <p className="flex items-center text-gray-600 dark:text-gray-300">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                    Rp {concert.concert_price.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleBuyTicket(concert)}
                                                disabled={isLoading}
                                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                                            >
                                                {isLoading ? 'Memproses...' : 'Beli Tiket'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg">Tidak ada konser yang tersedia saat ini.</p>
                            )}
                        </div>
                    </div>
                </main>

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
                            <CustomFooter />
            </div>

        </>
    );
}