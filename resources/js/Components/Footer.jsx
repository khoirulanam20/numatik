export default function CustomFooter() {
    return (
        <footer className=" w-full max-w-screen-2xl mt-5 px-6 py-3 mx-auto text-gray-900 bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            <img src="/assets/logoo.png" className="h-8 me-3" alt="Numatik Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">NUMATIK</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Layanan</h2>
                            <ul className="text-gray-600 font-medium">
                                <li className="mb-4">
                                    <a href="/konser" className="hover:text-blue-500 transition-colors">Konser Musik</a>
                                </li>
                                <li>
                                    <a href="/tiket-konser" className="hover:text-blue-500 transition-colors">Tiket Konser</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Ikuti Kami</h2>
                            <ul className="text-gray-600 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:text-blue-500 transition-colors">Instagram</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
                            <ul className="text-gray-600 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:text-blue-500 transition-colors">Kebijakan Privasi</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500 transition-colors">Syarat &amp; Ketentuan</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">© 2023 <a href="/" className="hover:text-blue-500 transition-colors">Numatik™</a>. Hak Cipta Dilindungi.
                    </span>
                    <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                        {/* Anda bisa menambahkan ikon media sosial di sini */}
                    </div>
                </div>
            </div>
        </footer>
    );
}