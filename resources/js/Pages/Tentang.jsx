import React from "react";
import { Head } from "@inertiajs/react";
import CustomNavbar from "@/Components/Navbar";
import CustomFooter from "@/Components/Footer";

export default function Tentang({ auth }) {
    return (
        <>
            <Head title="Tentang" />
            <div className="min-h-screen flex flex-col  bg-gradient-to-b dark:from-blue-800 dark:to-gray-900 from-blue-400 to-gray-50">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-12">
                        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <img className="h-full w-full object-cover md:w-48" src="/assets/birthday.jpg" alt="Event Organizer" />
                                </div>
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Tentang Kami</div>
                                    <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                        Event Organizer
                                    </h1>
                                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                                        Didirikan pada tahun 2021, Event Organizer adalah perusahaan yang berdedikasi untuk menciptakan dan mengelola acara-acara luar biasa.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Layanan Kami</h2>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        Kami menyediakan berbagai layanan termasuk acara perusahaan, pernikahan, pesta ulang tahun, dan banyak lagi. Tim profesional kami berdedikasi untuk memberikan layanan berkualitas tinggi.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Misi Kami</h2>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        Misi kami adalah menciptakan acara-acara yang tak terlupakan. Kami berusaha melampaui harapan klien dengan memberikan layanan luar biasa, solusi inovatif, dan perhatian terhadap detail.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Visi Kami</h2>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        Kami bertujuan menjadi perusahaan event organizer terkemuka yang dikenal karena kreativitas, keandalan, dan keunggulan dalam layanan. Kami membayangkan dunia di mana setiap acara adalah pengalaman unik dan berkesan.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mengapa Memilih Kami?</h2>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Pengalaman dan keahlian dalam berbagai jenis acara
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Tim kreatif yang selalu menghadirkan ide-ide segar
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Perhatian terhadap detail untuk kesempurnaan acara
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Komitmen untuk kepuasan klien
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
                <CustomFooter />
            </div>
        </>
    );
}