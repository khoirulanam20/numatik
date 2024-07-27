import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Dashboard({ auth }) {
    const [concerts, setConcerts] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        concert_name: '',
        concert_location: '',
        concert_date: '',
        concert_price: '',
        concert_image: null,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConcert, setSelectedConcert] = useState(null);

    const openModal = (concert) => {
        setSelectedConcert(concert);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedConcert(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchConcerts();
    }, []);

    const fetchConcerts = async () => {
        try {
            const response = await axios.get('/api/concerts');
            setConcerts(response.data);
        } catch (error) {
            console.error('Error fetching concerts:', error.response ? error.response.data : error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }
            const response = await axios.post('/concerts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            reset();
            fetchConcerts();
        } catch (error) {
            console.error('Error creating concert:', error.response ? error.response.data : error.message);
        }
    };

    const handleUpdate = async (e, id) => {
        e.preventDefault();
        const updatedData = new FormData();
        updatedData.append('concert_name', selectedConcert.concert_name);
        updatedData.append('concert_location', selectedConcert.concert_location);
        updatedData.append('concert_date', selectedConcert.concert_date);
        updatedData.append('concert_price', selectedConcert.concert_price);
        if (selectedConcert.concert_image instanceof File) {
            updatedData.append('concert_image', selectedConcert.concert_image);
        }

        try {
            const response = await axios.post(`/api/concerts/${id}`, updatedData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-HTTP-Method-Override': 'PUT'
                }
            });
            fetchConcerts();
            closeModal();
        } catch (error) {
            console.error('Error updating concert:', error.response ? error.response.data : error.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus konser ini?')) {
            try {
                await axios.delete(`/api/concerts/${id}`);
                fetchConcerts();
            } catch (error) {
                console.error('Error deleting concert:', error.response ? error.response.data : error.message);
            }
        }
    };

    const concertList = Array.isArray(concerts) ? (
        concerts.map((concert) => (
            <tr key={concert.id}>
                <td className="px-6 py-4 whitespace-nowrap">{concert.concert_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{concert.concert_location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{concert.concert_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{concert.concert_price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                        onClick={() => openModal(concert)}
                        className="text-green-600 hover:text-green-900 mr-2"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => handleDelete(concert.id)}
                        className="text-red-600 hover:text-red-900"
                    >
                        Hapus
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <p>Tidak ada konser yang tersedia.</p>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>

                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2 p-6">
                                <h3 className="text-lg font-semibold mb-4">Tambah Konser</h3>
                                <form className="mb-10" onSubmit={handleSubmit}>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input
                                            type="text"
                                            name="concert_name"
                                            id="concert_name"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required
                                            value={data.concert_name}
                                            onChange={(e) => setData('concert_name', e.target.value)}
                                        />
                                        <label
                                            htmlFor="concert_name"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Nama Konser
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-8 group">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                        <input
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            aria-describedby="file_input_help"
                                            id="file_input"
                                            type="file"
                                            onChange={(e) => setData('concert_image', e.target.files[0])}
                                        />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input
                                            type="date"
                                            name="concert_date"
                                            id="concert_date"
                                            className="block py-2.5 w-full text-smbg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-black"
                                            placeholder=" "
                                            required
                                            value={data.concert_date}
                                            onChange={(e) => setData('concert_date', e.target.value)}
                                            style={{ colorScheme: 'gray' }}
                                        />
                                        <label
                                            htmlFor="concert_date"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Tanggal Konser
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input
                                            type="text"
                                            name="concert_location"
                                            id="concert_location"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required
                                            value={data.concert_location}
                                            onChange={(e) => setData('concert_location', e.target.value)}
                                        />
                                        <label
                                            htmlFor="concert_location"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Lokasi Konser
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input
                                            type="number"
                                            name="concert_price"
                                            id="concert_price"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required
                                            value={data.concert_price}
                                            onChange={(e) => setData('concert_price', e.target.value)}
                                        />
                                        <label
                                            htmlFor="concert_price"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Harga Tiket
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>

                            <div className="md:w-1/2 p-6">
                                <h3 className="text-lg font-semibold mb-4">Daftar Konser</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {concertList}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Update Konser
                                    </Dialog.Title>
                                    {selectedConcert && (
                                        <form onSubmit={(e) => handleUpdate(e, selectedConcert.id)} className="mt-2">
                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                <div className="col-span-2">
                                                    <label htmlFor="concert_name" className="block mb-2 text-sm font-medium text-gray-900">Nama Konser</label>
                                                    <input
                                                        type="text"
                                                        id="concert_name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        value={selectedConcert.concert_name}
                                                        onChange={(e) => setSelectedConcert({ ...selectedConcert, concert_name: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label htmlFor="concert_location" className="block mb-2 text-sm font-medium text-gray-900">Lokasi Konser</label>
                                                    <input
                                                        type="text"
                                                        id="concert_location"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        value={selectedConcert.concert_location}
                                                        onChange={(e) => setSelectedConcert({ ...selectedConcert, concert_location: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2 sm:col-span-1">
                                                    <label htmlFor="concert_date" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Konser</label>
                                                    <input
                                                        type="date"
                                                        id="concert_date"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        value={selectedConcert.concert_date}
                                                        onChange={(e) => setSelectedConcert({ ...selectedConcert, concert_date: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2 sm:col-span-1">
                                                    <label htmlFor="concert_price" className="block mb-2 text-sm font-medium text-gray-900">Harga Tiket</label>
                                                    <input
                                                        type="number"
                                                        id="concert_price"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        value={selectedConcert.concert_price}
                                                        onChange={(e) => setSelectedConcert({ ...selectedConcert, concert_price: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label htmlFor="concert_image" className="block mb-2 text-sm font-medium text-gray-900">Gambar Konser</label>
                                                    <input
                                                        type="file"
                                                        id="concert_image"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        onChange={(e) => setSelectedConcert({ ...selectedConcert, concert_image: e.target.files[0] })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-end space-x-2">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </AuthenticatedLayout>
    );
}