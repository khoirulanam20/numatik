import React, { useState, useEffect } from "react";
import CustomNavbar from "@/Components/Navbar";
import CustomFooter from "@/Components/Footer";
import { Head } from "@inertiajs/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const formatDateIndonesian = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

const dummyNews = [
    {
        id_news: 1,
        title: "Konser Musik Terbesar Tahun Ini",
        description:
            "Konser musik terbesar tahun ini akan digelar di Jakarta dengan menampilkan berbagai artis terkenal dari dalam dan luar negeri.",
        image: "/assets/concert.jpg",
        published_at: "2023-06-15",
    },
    {
        id_news: 2,
        title: "Tips Mempersiapkan Pernikahan Impian",
        description:
            "Simak tips-tips berguna untuk mempersiapkan pernikahan impian Anda tanpa harus menghabiskan banyak biaya.",
        image: "/assets/wedding.jpg",
        published_at: "2023-06-10",
    },
    {
        id_news: 3,
        title: "Ide Kreatif untuk Pesta Ulang Tahun Anak",
        description:
            "Temukan berbagai ide kreatif untuk membuat pesta ulang tahun anak Anda menjadi tak terlupakan dan menyenangkan.",
        image: "/assets/birthday.jpg",
        published_at: "2023-06-05",
    },
    {
        id_news: 4,
        title: "Tren Dekorasi Acara Terkini",
        description:
            "Pelajari tren dekorasi acara terkini yang sedang populer untuk membuat acara Anda lebih menarik dan Instagram-able.",
        image: "/assets/concert.jpg",
        published_at: "2023-05-30",
    },
];

const Home = ({ auth }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=concert&apiKey=ba03e713175440e593eb1ab0107d138b`
                );
                const data = await response.json();
                setNews(data.articles.slice(0, 4)); // Ambil 4 berita teratas
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    // Tambahkan fungsi scrollToServices
    const scrollToServices = () => {
        const servicesSection = document.getElementById("layanan-kami");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Head title="Home" />
            <div className=" flex flex-col relative bg-gradient-to-b dark:from-blue-800 dark:to-gray-900 from-blue-400 to-gray-50">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow">
                    <div className="mx-auto">
                        <section
                            id="banner"
                            className="min-h-[100vh]  text-white"
                        >
                            <div className="container mx-auto px-4 ml-64 pt-0 md:py-24">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                            #NUMATIK
                                        </h1>
                                        <p className="text-lg mb-8">
                                            Bergabunglah dengan kami di Numatik
                                            untuk pengalaman konser yang tak
                                            terlupakan! Dengan bangga menyajikan
                                            akses mudah dan aman untuk meraih
                                            tiket konser impianmu.
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex justify-between items-center py-2 px-4 text-sm font-medium text-white bg-gradient-to-r dark:from-blue-800 dark:to-gray-800 dark:hover:from-blue-700 dark:hover:to-gray-700 from-blue-500 to-gray-300 rounded-full hover:from-blue-400 hover:to-gray-200 transition-all duration-300 shadow-md hover:shadow-lg"
                                            role="alert"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToServices();
                                            }}
                                        >
                                            <span className="bg-white text-blue-600 rounded-full px-3 py-1 text-xs font-semibold mr-3">
                                                Baru
                                            </span>
                                            <span>Pesan sekarang!</span>
                                            <svg
                                                className="ml-2 w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="hidden ml-24 md:block">
                                        <img
                                            src="/assets/logoo.png"
                                            alt="Hero"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="layanan-kami" className="px-4 py-12">
                            <div className="container mx-auto px-4 py-8">
                                <div className="flex text-left px-4">
                                    <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
                                        LAYANAN KAMI
                                    </h1>
                                </div>

                                <div className="border-t-2 w-48 dark:border-gray-100 border-gray-700 m-4"></div>

                                <div className="flex flex-col md:flex-row justify-around md:h-72 space-y-4 md:space-y-0 md:space-x-6 mt-7">
                                    <a
                                        href="/konser"
                                        className="relative w-full h-24 md:h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
                                    >
                                        <img
                                            src="/assets/concert.jpg"
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
                                        href="/tiket-konser"
                                        className="relative w-full h-24 md:h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
                                    >
                                        <img
                                            src="/assets/tiket.jpg"
                                            alt="Card Image"
                                            className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-50"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-70 text-white p-4 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                            <h3 className="text-xl font-bold mb-2">
                                                Tiket Konser
                                            </h3>
                                            <p>Deskripsi 1</p>
                                        </div>
                                    </a>
                                    <a
                                        href="/Pernikahan"
                                        className="relative w-full h-24 md:h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
                                    >
                                        <img
                                            src="/assets/wedding.jpg"
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
                                        className="relative w-full h-24 md:h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
                                    >
                                        <img
                                            src="/assets/birthday.jpg"
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
                            </div>
                        </section>

                        <section className="container mx-auto px-4 py-8">
                            <div className="flex text-left px-4">
                                <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
                                    KONSER TERDAHULU
                                </h1>
                            </div>

                            <div className="border-t-2 w-64 dark:border-gray-100 border-gray-700 mb-8 m-4"></div>

                            <div className="max-h-[300px] md:max-h-[700px]">
                                <Carousel
                                    showThumbs={false}
                                    infiniteLoop
                                    useKeyboardArrows
                                    autoPlay
                                >
                                    <div className="w-full h-[300px] md:h-[600px] overflow-hidden relative">
                                        <img
                                            src="/assets/concert.jpg"
                                            alt="Slide 1"
                                            className="w-full h-full object-cover"
                                        />
                                        <p className="absolute bottom-10 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2">
                                            Ini memastikan deskripsi muncul di bagian bawah gambar dengan latar belakang hitam semi-transparan untuk meningkatkan keterbacaan.
                                        </p>
                                    </div>
                                    <div className="w-full h-[300px] md:h-[600px] overflow-hidden relative">
                                        <img
                                            src="/assets/wedding.jpg"
                                            alt="Slide 2"
                                            className="w-full h-full object-cover"
                                        />
                                        <p className="absolute bottom-10 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2">
                                            Deskripsi Pernikahan
                                        </p>
                                    </div>
                                    <div className="w-full h-[300px] md:h-[600px] overflow-hidden relative">
                                        <img
                                            src="/assets/birthday.jpg"
                                            alt="Slide 3"
                                            className="w-full h-full object-cover"
                                        />
                                        <p className="absolute bottom-10 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2">
                                            Deskripsi Ulang Tahun
                                        </p>
                                    </div>
                                    <div className="w-full h-[300px] md:h-[600px] overflow-hidden relative">
                                        <img
                                            src="/assets/concert.jpg"
                                            alt="Slide 4"
                                            className="w-full h-full object-cover"
                                        />
                                        <p className="absolute bottom-10 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2">
                                            Deskripsi Konser Musik
                                        </p>
                                    </div>
                                    <div className="w-full h-[300px] md:h-[600px] overflow-hidden relative">
                                        <img
                                            src="/assets/concert.jpg"
                                            alt="Slide 5"
                                            className="w-full h-full object-cover"
                                        />
                                        <p className="absolute bottom-10 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2">
                                            Deskripsi Konser Musik
                                        </p>
                                    </div>
                                </Carousel>
                            </div>
                        </section>

                        <section className="py-16">
                            <div className="container mx-auto px-4">
                                <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
                                    BERITA TERKINI
                                </h2>
                                <div className="w-24 h-1 bg-blue-600 mb-8"></div>

                                <div className="grid md:grid-cols-4 gap-8">
                                    {news.map((article, index) => (
                                        <div
                                            key={index}
                                            className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                                        >
                                            <img
                                                src={article.urlToImage}
                                                alt={article.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-4">
                                                <span className="text-sm text-gray-500 dark:text-gray-300">
                                                    {formatDateIndonesian(
                                                        article.publishedAt
                                                    )}
                                                </span>
                                                <h3 className="text-lg font-semibold mt-2 mb-2 line-clamp-2 text-gray-800 dark:text-white">
                                                    {article.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                                                    {article.description}
                                                </p>
                                                <a
                                                    href={article.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                                >
                                                    Baca Selengkapnya
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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