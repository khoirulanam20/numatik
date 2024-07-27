import React, { useState, useEffect } from "react";
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
            console.log(`Updating status for ${type} with ID ${id} to ${value}`);
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
                    setPernikahanData(
                        pernikahanData.filter((item) => item.id !== id)
                    );
                } else if (type === "ulang-tahuns") {
                    setUlangTahunData(
                        ulangTahunData.filter((item) => item.id !== id)
                    );
                } else if (type === "konser-inputs") {
                    setKonserData(konserData.filter((item) => item.id !== id));
                }
            } catch (error) {
                console.error("Error deleting item:", error);
                alert("Terjadi kesalahan saat menghapus layanan.");
            }
        }
    };

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

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">
                                Daftar Layanan Pernikahan
                            </h3>

                            {Array.isArray(pernikahanData) &&
                            pernikahanData.length > 0 ? (
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        onChange={(e) => {
                                                            const isChecked =
                                                                e.target
                                                                    .checked;
                                                            setSelectedItems(
                                                                (
                                                                    prevState
                                                                ) => ({
                                                                    ...prevState,
                                                                    pernikahans:
                                                                        isChecked
                                                                            ? pernikahanData.map(
                                                                                  (
                                                                                      item
                                                                                  ) =>
                                                                                      item.id
                                                                              )
                                                                            : [],
                                                                })
                                                            );
                                                        }}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Nama Acara
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Lokasi
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Tanggal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Paket
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pernikahanData.map(
                                                (pernikahan) => (
                                                    <tr
                                                        key={pernikahan.id}
                                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                                    >
                                                        <td className="px-6 py-4">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedItems.pernikahans[pernikahan.id] === 1}
                                                                onChange={(e) => handleCheckboxChange(pernikahan.id, "pernikahans", e.target.checked)}
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                        </td>
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {
                                                                pernikahan.nama_acara
                                                            }
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {pernikahan.lokasi}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {pernikahan.tanggal}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {pernikahan.paket}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {pernikahan.user &&
                                                            pernikahan.user
                                                                .email
                                                                ? pernikahan
                                                                      .user
                                                                      .email
                                                                : "Email tidak tersedia"}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        pernikahan.id,
                                                                        "pernikahans"
                                                                    )
                                                                }
                                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>Tidak ada data pernikahan yang tersedia.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4 mt-8">
                                Daftar Layanan Ulang Tahun
                            </h3>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        const isChecked =
                                                            e.target.checked;
                                                        setSelectedItems(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                ulangTahuns:
                                                                    isChecked
                                                                        ? ulangTahunData.map(
                                                                              (
                                                                                  item
                                                                              ) =>
                                                                                  item.id
                                                                          )
                                                                        : [],
                                                            })
                                                        );
                                                    }}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nama Acara
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Lokasi
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Tanggal
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Paket
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ulangTahunData.map((ulangTahun) => (
                                            <tr
                                                key={ulangTahun.id}
                                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                            >
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.ulangTahuns[ulangTahun.id] === 1}
                                                        onChange={(e) => handleCheckboxChange(ulangTahun.id, "ulangTahuns", e.target.checked)}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                </td>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {ulangTahun.nama_acara}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {ulangTahun.lokasi}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {ulangTahun.tanggal}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {ulangTahun.paket}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {ulangTahun.user &&
                                                    ulangTahun.user.email
                                                        ? ulangTahun.user.email
                                                        : "Email tidak tersedia"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                ulangTahun.id,
                                                                "ulang-tahuns"
                                                            )
                                                        }
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4 mt-8">
                                Daftar Layanan Konser
                            </h3>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        const isChecked =
                                                            e.target.checked;
                                                        setSelectedItems(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                konserInputs:
                                                                    isChecked
                                                                        ? konserData.map(
                                                                              (
                                                                                  item
                                                                              ) =>
                                                                                  item.id
                                                                          )
                                                                        : [],
                                                            })
                                                        );
                                                    }}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nama Acara
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Lokasi
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Tanggal
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Paket
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {konserData &&
                                            Array.isArray(konserData) &&
                                            konserData.map((konserInput) => (
                                                <tr
                                                    key={konserInput.id}
                                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                                >
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedItems.konserInputs[konserInput.id] === 1}
                                                            onChange={(e) => handleCheckboxChange(konserInput.id, "konserInputs", e.target.checked)}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                    </td>
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {konserInput.nama_acara}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {konserInput.lokasi}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {konserInput.tanggal}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {konserInput.paket}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {konserInput.user &&
                                                        konserInput.user.email
                                                            ? konserInput.user
                                                                  .email
                                                            : "Email tidak tersedia"}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    konserInput.id,
                                                                    "konser-inputs"
                                                                )
                                                            }
                                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
