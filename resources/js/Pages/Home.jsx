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
        const servicesSection = document.getElementById('layanan-kami');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen flex flex-col relative">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow">
                    <div className="mx-auto">
                        <section id="banner">
                            <section className="bg-gray-400 mb-4 dark:bg-gray-900 min-h-screen flex items-center">
                                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                                    <div className="mr-auto place-self-center lg:col-span-7 rounded-lg">
                                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-700 dark:text-white">
                                            #NUMATIK
                                        </h1>
                                        <p className="max-w-2xl mb-6 font-light text-gray-900 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                                            Bergabunglah dengan kami di Numatik
                                            untuk pengalaman konser yang tak
                                            terlupakan! Dengan bangga menyajikan
                                            akses mudah dan aman untuk meraih
                                            tiket konser impianmu. Berikut
                                            adalah beberapa alasan mengapa
                                            Numatik adalah pilihan terbaikmu:
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToServices();
                                            }}
                                        >
                                            Order now
                                            <svg
                                                className="w-5 h-5 ml-2 -mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
                                        <img
                                            src="/assets/hero.png"
                                            alt="mockup"
                                        />
                                    </div>
                                </div>
                            </section>
                        </section>

                        <section id="layanan-kami" className="px-4 py-12">

                        <div className="container mx-auto px-4 py-8">
                            <div className="flex text-left px-4">
                                <h1 className="text-2xl font-bold text-gray-100 dark:text-white">
                                    LAYANAN KAMI
                                </h1>
                            </div>

                            <div className="border-t-2 w-48 border-gray-100 m-4"></div>

                            <div className="flex justify-around space-x-8 mt-7">
                                <a
                                    href="/konser"
                                    className="relative w-full  h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
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
                                    href="/Pernikahan"
                                    className="relative w-full  h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
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
                                    className="relative w-full h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
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
                                <h1 className="text-2xl font-bold text-gray-100 dark:text-white">
                                    KONSER TERDAHULU
                                </h1>
                            </div>

                            <div className="border-t-2 w-64  border-gray-100 mb-8  m-4"></div>

                            <Carousel
                                showThumbs={false}
                                infiniteLoop
                                useKeyboardArrows
                                autoPlay
                            >
                                <div className="w-full h-[500px] overflow-hidden relative">
                                    <img
                                        src="/assets/concert.jpg"
                                        alt="Slide 1"
                                    />
                                    <p className="absolute bottom-10 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2">
                                        Ini memastikan deskripsi muncul di
                                        bagian bawah gambar dengan latar
                                        belakang hitam semi-transparan untuk
                                        meningkatkan keterbacaan.
                                    </p>
                                </div>
                                <div className="w-full h-[500px] overflow-hidden relative">
                                    <img
                                        src="/assets/wedding.jpg"
                                        alt="Slide 2"
                                    />
                                    <p className="absolute bottom-10 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2">
                                        Deskripsi Pernikahan
                                    </p>
                                </div>
                                <div className="w-full h-[500px] overflow-hidden relative">
                                    <img
                                        src="/assets/birthday.jpg"
                                        alt="Slide 3"
                                    />
                                    <p className="absolute bottom-10 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2">
                                        Deskripsi Ulang Tahun
                                    </p>
                                </div>
                                <div className="w-full h-[500px] overflow-hidden relative">
                                    <img
                                        src="/assets/concert.jpg"
                                        alt="Slide 4"
                                    />
                                    <p className="absolute bottom-10 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2">
                                        Deskripsi Konser Musik
                                    </p>
                                </div>
                                <div className="w-full h-[500px] overflow-hidden relative">
                                    <img
                                        src="/assets/concert.jpg"
                                        alt="Slide 5"
                                    />
                                    <p className="absolute bottom-10 left-0 w-full text-center text-white bg-black bg-opacity-50 p-2">
                                        Deskripsi Konser Musik
                                    </p>
                                </div>
                            </Carousel>
                        </section>

                        <section className="container mx-auto px-4 py-8">
                            <div className="flex text-left px-4">
                                <h1 className="text-2xl font-bold text-gray-100 dark:text-white">
                                    BERITA
                                </h1>
                            </div>

                            <div className="border-t-2 w-24 border-gray-100 mb-8 m-4"></div>

                            <div className="mt-1">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {news.map((article, index) => (
                                        <div key={index}>
                                            <div className="relative overflow-hidden rounded-lg shadow-lg">
                                                <img
                                                    src={article.urlToImage}
                                                    alt={article.title}
                                                    className="w-full h-64 object-cover mb-4 transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
                                                />
                                            </div>
                                            <span className="block text-xs text-gray-100 dark:text-white">
                                                {formatDateIndonesian(
                                                    article.publishedAt
                                                )}
                                            </span>
                                            <div className="mt-2">
                                                <a
                                                    href={article.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <h3 className="text-base font-bold mt-2 line-clamp-2 hover:text-gray-500">
                                                        {article.title}
                                                    </h3>
                                                </a>
                                                <p className="mt-1 text-sm line-clamp-4">
                                                    {article.description}
                                                </p>
                                                <a
                                                    href={article.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center font-medium text-gray-400 hover:text-w"
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