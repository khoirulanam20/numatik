import React from "react";
import { Head } from "@inertiajs/react";
import CustomNavbar from "@/Components/Navbar";
import CustomFooter from "@/Components/Footer";

export default function Tentang({ auth }) {
    return (
        <>
            <Head title="Tentang" />
            <div className="min-h-screen flex flex-col ">
                <CustomNavbar user={auth.user} />
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8 mt-8 rounded-md bg-gray-400 mb-4 dark:bg-gray-900 flex items-center">
                        <div class="sm:flex items-center max-w-screen-xl">
                            <div class="sm:w-1/2 p-10">
                                <div class="image object-center text-center">
                                    <img src="/assets/birthday.jpg" />
                                </div>
                            </div>
                            <div class="sm:w-1/2 p-5">
                                <div class="text-justify">
                                    <span class="text-gray-700 dark:text-white border-b-2 border-indigo-600 uppercase">
                                        About us
                                    </span>
                                    <h2 class="my-4 font-bold text-3xl text-gray-700 dark:text-white sm:text-4xl ">
                                        About{" "}
                                        <span class="text-indigo-600">
                                            Our Company
                                        </span>
                                    </h2>
                                    <p class="text-gray-700 dark:text-white">
                                        Founded in 2021, Event Organizer is
                                        dedicated to creating and managing
                                        extraordinary events. We specialize in a
                                        wide range of services including
                                        corporate events, weddings, birthday
                                        parties, and more. Our team of
                                        experienced professionals is passionate
                                        about delivering the highest quality
                                        service and ensuring that each event is
                                        memorable and exceeds our clients'
                                        expectations.
                                    </p>
                                    <br />
                                    <p class="text-gray-700 dark:text-white">
                                        With a keen eye for detail and a
                                        commitment to excellence, we work
                                        closely with our clients to understand
                                        their vision and bring it to life. Our
                                        innovative approach and creative
                                        solutions set us apart, making us a
                                        trusted partner for all your event
                                        planning needs.
                                    </p>    
                                    <br />
                                    <p class="text-gray-700  dark:text-white">
                                        <h3 class="text-gray-700 font-bold dark:text-white">Our Mission</h3>
                                        <br />
                                        Our mission is to create
                                        unforgettable events that leave a
                                        lasting impression. We strive to exceed
                                        our clients' expectations by providing
                                        exceptional service, innovative
                                        solutions, and meticulous attention to
                                        detail.
                                    </p>
                                    <br />
                                    <p class="text-gray-700 dark:text-white">
                                        <h3 class="text-gray-700 font-bold dark:text-white">Our Vision</h3>
                                        <br />
                                        We aim to be the leading event organizer
                                        company known for our creativity,
                                        reliability, and
                                        excellence in service. We envision a
                                        world where every event is a unique and
                                        memorable experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <CustomFooter />
            </div>
        </>
    );
}
