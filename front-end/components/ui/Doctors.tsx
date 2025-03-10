"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Stethoscope, Clock } from "lucide-react";
import { doctors } from "@/constants/doctors";

const Doctors = () => {

    const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});

    const handleHover = (id: number) => {
        setFlipped((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => {
            setFlipped((prev) => ({ ...prev, [id]: false }));
        }, 1500);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
                👨‍⚕️ قائمة الأطباء
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-5">
                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
                    >
                        <div
                            className="relative w-full h-64"
                            onMouseEnter={() => handleHover(doctor.id)}
                        >
                            <Image
                                src={flipped[doctor.id] ? doctor.imageBack : doctor.imageFront}
                                //src={doctor.imageFront}
                                alt={doctor.name}
                                layout="fill"
                                objectFit="cover"
                                className={`transition - transform duration-1000 ${flipped[doctor.id] ? "rotate-y-180" : "rotate-y-0"}`}
                            />
                        </div>

                        <div className="p-5 text-center">
                            <h2 className="text-xl font-bold text-gray-800 flex justify-center items-center gap-2">
                                <User className="text-blue-500" /> {doctor.name}
                            </h2>
                            <p className="text-gray-600 mt-2 flex justify-center items-center gap-2">
                                <Stethoscope className="text-green-500" /> {doctor.speciality}
                            </p>
                            <p className="text-gray-500 mt-2 flex justify-center items-center gap-2">
                                <Clock className="text-red-500" /> {doctor.experience}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctors;