import React from "react";
import CustomNavbar from "@/Components/Navbar";
import CustomFooter from "@/Components/Footer";
import { Head } from "@inertiajs/react";

const Home = ({ auth }) => {
    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen flex flex-col">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow">
                    <div className="mx-auto">

                    <section id="banner">
                        <section className="bg-gray-400 mb-4 dark:bg-gray-900 min-h-screen flex items-center">
                            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                                <div className="mr-auto place-self-center lg:col-span-7 rounded-lg">
                                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-700 dark:text-white">
                                        Payments tool for software companies
                                    </h1>
                                    <p className="max-w-2xl mb-6 font-light text-gray-900 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                                        From checkout to global sales tax
                                        compliance, companies around the world
                                        use Flowbite to simplify their payment
                                        stack.
                                    </p>
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    >
                                        Get started
                                        <svg
                                            className="w-5 h-5 ml-2 -mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                    >
                                        Speak to Sales
                                    </a>
                                </div>
                                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
                                    <img
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                                        alt="mockup"
                                    />
                                </div>
                                </div>
                            </section>
                        </section>

                    <section className="container mx-auto px-4 py-8">

                        <div className="flex text-left px-4">
                            <h1 className="text-2xl font-bold text-gray-100 dark:text-white">
                                LAYANAN KAMI
                            </h1>
                        </div>


                            <div className="flex justify-around space-x-8 mt-7">
                            <a
                                href="/konser"
                                className="relative w-full  h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
                            >
                                <img
                                    src="https://rebellion.qodeinteractive.com/wp-content/uploads/2016/09/album-cover-image-2.jpg"
                                    alt="Card Image"
                                    className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-50"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-70 text-white p-4 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                    <h3 className="text-xl font-bold mb-2">
                                        Konser Musik
                                    </h3>
                                    <p>Deskripsi 1</p>
                                </div>
                            </a>
                            <a
                                href="/Pernikahan"
                                className="relative w-full  h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
                            >
                                <img
                                    src="https://rebellion.qodeinteractive.com/wp-content/uploads/2016/09/album-cover-image-2.jpg"
                                    alt="Card Image"
                                    className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-50"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-70 text-white p-4 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                    <h3 className="text-xl font-bold mb-2">
                                        Pernikahan
                                    </h3>
                                    <p>Deskripsi 2</p>
                                </div>
                            </a>
                            <a
                                href="/page-judul-3"
                                className="relative w-full h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
                            >
                                <img
                                    src="https://rebellion.qodeinteractive.com/wp-content/uploads/2016/09/album-cover-image-2.jpg"
                                    alt="Card Image"
                                    className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-50"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-70 text-white p-4 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                    <h3 className="text-xl font-bold mb-2">
                                        Ulang Tahun
                                    </h3>
                                    <p>Deskripsi 3</p>
                                </div>
                                </a>
                            </div>
                        </section>

                    </div>
                </main>
                <CustomFooter />
            </div>
        </>
    );
};

export default Home;