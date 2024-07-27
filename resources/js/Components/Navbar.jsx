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
        <nav className="sticky top-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 z-10">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-white">
                        NUMATIK
                    </span>
                </Link>
                <div className="flex items-center md:order-2">
                    <button
                        onClick={toggleTheme}
                        className="text-gray-900 dark:text-gray-300 p-2 mr-2"
                    >
                        {isDarkMode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 3a9 9 0 000 18 9 9 0 000-18zM12 1v2m0 18v2m8.66-8.66h-2M4.34 12H2m15.36 4.95l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 12.02l-1.41-1.41M6.34 17.66L4.93 16.25"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.36 4.95l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 5a7 7 0 100 14 7 7 0 000-14z"
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
                                <span className="sr-only">Open user menu</span>
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
                                    <Dropdown.Link href={route("profile.edit")}>
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
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-dropdown"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Buka menu utama</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
                        isOpen ? "block" : "hidden"
                    }`}
                    id="navbar-dropdown"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700 md:ml-auto">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 px-3 text-black rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent"
                                aria-current="page"
                            >
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("tiket-konser")}
                                className="block py-2 px-3 text-black rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Tiket Konser
                            </Link>
                        </li>
                        <li>
                            <Popover className="z-20">
                                <PopoverButton className="block md:p-0 py-2 px-3 text-black dark:text-white focus:outline-none data-[active]:text-gray-400 md:flex-row md:mt-0 md:dark:hover:text-blue-500 data-[hover]:text-blue-500 data-[focus]:outline-1 data-[focus]:outline-white">
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
                        </li>
                        <li>
                            <Link
                                href={route("tentang")}
                                className="block py-2 px-3 text-black rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Tentang
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/riwayat"
                                className="block py-2 px-3 text-black rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Riwayat
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}