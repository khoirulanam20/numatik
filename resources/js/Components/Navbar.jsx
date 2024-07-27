import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Dropdown from "@/Components/Dropdown";

export default function CustomNavbar({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-24">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex-shrink-0 flex items-center"
                        >
                            <img
                                src="/assets/logoo.png"
                                className="h-8 w-auto"
                                alt="Numatik Logo"
                            />
                            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                                NUMATIK
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <Link
                            href="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                        >
                            Beranda
                        </Link>
                        <Link
                            href={route("tiket-konser")}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                        >
                            Tiket Konser
                        </Link>
                        <Popover className="z-20">
                            <PopoverButton className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                                Layanan
                            </PopoverButton>
                            <PopoverPanel
                                transition
                                anchor="bottom"
                                className="z-50 divide-y mt-6 divide-white/100 dark:divide-gray-700 rounded-xl bg-stone-100 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 md:bg-white/55"
                            >
                                <div className="p-3">
                                    <a
                                        className="block rounded-lg py-2 px-3 transition dark:hover:bg-white/50 hover:bg-white/55"
                                        href={route("konser")}
                                    >
                                        <h1 className="font-semibold  text-black md:text-black">
                                            Konser Musik
                                        </h1>
                                    </a>
                                    <a
                                        className="block rounded-lg py-2 px-3 transition dark:hover:bg-white/50 hover:bg-white/55"
                                        href={route("ulang-tahun")}
                                    >
                                        <p className="font-semibold text-black md:text-black">
                                            Ulang Tahun
                                        </p>
                                    </a>
                                    <a
                                        className="block rounded-lg py-2 px-3 transition dark:hover:bg-white/50 hover:bg-white/55"
                                        href={route("pernikahan")}
                                    >
                                        <p className="font-semibold text-black md:text-black">
                                            Pernikahan
                                        </p>
                                    </a>
                                </div>
                            </PopoverPanel>
                        </Popover>
                        <Link
                            href={route("tentang")}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                        >
                            Tentang
                        </Link>
                        <Link
                            href="/riwayat"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                        >
                            Riwayat
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 "
                        >
                            {isDarkMode ? (
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="flex text-sm bg-gray-80"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                {user ? (
                                    <>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Logout
                                        </Dropdown.Link>
                                    </>
                                ) : (
                                    <>
                                        <Dropdown.Link href={route("login")}>
                                            Login
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route("register")}>
                                            Register
                                        </Dropdown.Link>
                                    </>
                                )}
                            </Dropdown.Content>
                        </Dropdown>

                        <button
                            type="button"
                            className="ml-4 md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Buka menu utama</span>
                            <svg
                                className={`${
                                    isOpen ? "hidden" : "block"
                                } h-6 w-6`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`${
                                    isOpen ? "block" : "hidden"
                                } h-6 w-6`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                        href="/"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out"
                    >
                        Beranda
                    </Link>
                    <Link
                        href={route("tiket-konser")}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out"
                    >
                        Tiket Konser
                    </Link>
                    <Popover className="z-20">
                        <PopoverButton className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out">
                            Layanan
                        </PopoverButton>
                        <PopoverPanel
                            transition
                            anchor="bottom"
                            className="z-50 divide-y mt-6 divide-white/100 dark:divide-gray-700 rounded-xl bg-stone-100 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 md:bg-white/55"
                        >
                            <div className="p-3">
                                <a
                                    className="block rounded-lg py-2 px-3 transition dark:hover:bg-white/50 hover:bg-white/55"
                                    href={route("konser")}
                                >
                                    <h1 className="font-semibold  text-black md:text-black">
                                        Konser Musik
                                    </h1>
                                </a>
                                <a
                                    className="block rounded-lg py-2 px-3 transition dark:hover:bg-white/50 hover:bg-white/55"
                                    href={route("ulang-tahun")}
                                >
                                    <p className="font-semibold text-black md:text-black">
                                        Ulang Tahun
                                    </p>
                                </a>
                                <a
                                    className="block rounded-lg py-2 px-3 transition dark:hover:bg-white/50 hover:bg-white/55"
                                    href={route("pernikahan")}
                                >
                                    <p className="font-semibold text-black md:text-black">
                                        Pernikahan
                                    </p>
                                </a>
                            </div>
                        </PopoverPanel>
                    </Popover>
                    <Link
                        href={route("tentang")}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out"
                    >
                        Tentang
                    </Link>
                    <Link
                        href="/riwayat"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out"
                    >
                        Riwayat
                    </Link>
                </div>
            </div>
        </nav>
    );
}
