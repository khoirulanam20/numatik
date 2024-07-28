import React, { useState, useEffect, useRef } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function LayananDashboard({
    auth,
    pernikahans,
    ulangTahuns,
    konserInputs,
}) {
    const [pernikahanData, setPernikahanData] = useState(pernikahans);
    const [ulangTahunData, setUlangTahunData] = useState(ulangTahuns);
    const [konserData, setKonserData] = useState(konserInputs);
    const [selectedItems, setSelectedItems] = useState({
        pernikahans: {},
        ulangTahuns: {},
        konserInputs: {},
    });
    const [activeTab, setActiveTab] = useState('pernikahan');

    useEffect(() => {
        // Initialize selectedItems with the status from the server
        const initialSelectedItems = {
            pernikahans: pernikahans.reduce((acc, item) => {
                acc[item.id] = item.status;
                return acc;
            }, {}),
            ulangTahuns: ulangTahuns.reduce((acc, item) => {
                acc[item.id] = item.status;
                return acc;
            }, {}),
            konserInputs: konserInputs.reduce((acc, item) => {
                acc[item.id] = item.status;
                return acc;
            }, {}),
        };
        setSelectedItems(initialSelectedItems);
    }, [pernikahans, ulangTahuns, konserInputs]);

    const handleCheckboxChange = async (id, type, isChecked) => {
        try {
            const value = isChecked ? 1 : 0;
            await axios.put(`/api/${type}/${id}/update-status`, { status: value });
            
            setSelectedItems(prevState => ({
                ...prevState,
                [type]: {
                    ...prevState[type],
                    [id]: value
                }
            }));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Terjadi kesalahan saat memperbarui status.");
        }
    };

    const handleDelete = async (id, type) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus layanan ini?")) {
            try {
                await axios.delete(`/api/${type}/${id}`);
                if (type === "pernikahans") {
                    setPernikahanData(pernikahanData.filter((item) => item.id !== id));
                } else if (type === "ulang-tahuns") {
                    setUlangTahunData(ulangTahunData.filter((item) => item.id !== id));
                } else if (type === "konser-inputs") {
                    setKonserData(konserData.filter((item) => item.id !== id));
                }
            } catch (error) {
                console.error("Error deleting item:", error);
                alert("Terjadi kesalahan saat menghapus layanan.");
            }
        }
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text).then(() => {
            const defaultIcon = document.getElementById(`default-icon-${id}`);
            const successIcon = document.getElementById(`success-icon-${id}`);
            const defaultTooltip = document.getElementById(`default-tooltip-message-${id}`);
            const successTooltip = document.getElementById(`success-tooltip-message-${id}`);

            defaultIcon.classList.add('hidden');
            successIcon.classList.remove('hidden');
            defaultTooltip.classList.add('hidden');
            successTooltip.classList.remove('hidden');

            setTimeout(() => {
                defaultIcon.classList.remove('hidden');
                successIcon.classList.add('hidden');
                defaultTooltip.classList.remove('hidden');
                successTooltip.classList.add('hidden');
            }, 2000);
        });
    };

    const renderTable = (data, type) => (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id={`checkbox-all-${type}`}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setSelectedItems(prevState => ({
                                            ...prevState,
                                            [type]: data.reduce((acc, item) => {
                                                acc[item.id] = isChecked ? 1 : 0;
                                                return acc;
                                            }, {})
                                        }));
                                    }}
                                />
                                <label htmlFor={`checkbox-all-${type}`} className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">Nama Acara</th>
                        <th scope="col" className="px-6 py-3">Lokasi</th>
                        <th scope="col" className="px-6 py-3">Tanggal</th>
                        <th scope="col" className="px-6 py-3">Paket</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems[type][item.id] === 1}
                                        onChange={(e) => handleCheckboxChange(item.id, type, e.target.checked)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.nama_acara}
                            </th>
                            <td className="px-6 py-4">{item.lokasi}</td>
                            <td className="px-6 py-4">{item.tanggal}</td>
                            <td className="px-6 py-4">{item.paket}</td>
                            <td className="px-6 py-4">
                                <div className="w-full max-w-[16rem]">
                                    <div className="relative">
                                        <input
                                            id={`email-input-${item.id}`}
                                            type="text"
                                            className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={item.user?.email || "Email tidak tersedia"}
                                            disabled
                                            readOnly
                                        />
                                        <button
                                            onClick={() => copyToClipboard(item.user?.email || "Email tidak tersedia", item.id)}
                                            data-tooltip-target={`tooltip-copy-email-${item.id}`}
                                            className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
                                        >
                                            <span id={`default-icon-${item.id}`}>
                                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                                                </svg>
                                            </span>
                                            <span id={`success-icon-${item.id}`} className="hidden">
                                                <svg className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500 inline-flex" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                                </svg>
                                            </span>
                                        </button>
                                        <div id={`tooltip-copy-email-${item.id}`} role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                            <span id={`default-tooltip-message-${item.id}`}>Salin ke clipboard</span>
                                            <span id={`success-tooltip-message-${item.id}`} className="hidden">Tersalin!</span>
                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedItems[type][item.id] === 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {selectedItems[type][item.id] === 1 ? 'Sudah' : 'Belum'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleDelete(item.id, type)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard Layanan
                </h2>
            }
        >
            <Head title="Dashboard Layanan" />

            <div className="py-12 bg-gray-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold mb-6 text-blue-600">
                                Daftar Layanan
                            </h3>

                            <div className="mb-6">
                                <div className="sm:hidden">
                                    <select
                                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                        onChange={(e) => setActiveTab(e.target.value)}
                                        value={activeTab}
                                    >
                                        <option value="pernikahan">Pernikahan</option>
                                        <option value="ulangTahun">Ulang Tahun</option>
                                        <option value="konser">Konser</option>
                                    </select>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="border-b border-gray-200">
                                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                            <a
                                                href="#"
                                                className={`${activeTab === 'pernikahan' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                                onClick={() => setActiveTab('pernikahan')}
                                            >
                                                Pernikahan
                                            </a>
                                            <a
                                                href="#"
                                                className={`${activeTab === 'ulangTahun' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                                onClick={() => setActiveTab('ulangTahun')}
                                            >
                                                Ulang Tahun
                                            </a>
                                            <a
                                                href="#"
                                                className={`${activeTab === 'konser' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                                onClick={() => setActiveTab('konser')}
                                            >
                                                Konser
                                            </a>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {activeTab === 'pernikahan' && renderTable(pernikahanData, 'pernikahans')}
                            {activeTab === 'ulangTahun' && renderTable(ulangTahunData, 'ulangTahuns')}
                            {activeTab === 'konser' && renderTable(konserData, 'konserInputs')}

                            {/* Hapus atau komentari baris berikut jika tidak digunakan */}
                            {/* <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}