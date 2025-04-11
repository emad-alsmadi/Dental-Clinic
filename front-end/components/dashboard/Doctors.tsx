"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Stethoscope, Clock } from "lucide-react";
import { doctors } from "@/constants/doctors";

const Doctors = () => {
    const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});

    const handleHover = (id: number) => {
        setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="container mx-auto py-16 px-6">
            <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-12">
                👨‍⚕️ قائمة الأطباء
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {doctors.map((doctor) => (
                    <motion.div
                        key={doctor.id}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300"
                    >
                        <div
                            className="relative w-full h-64 cursor-pointer"
                            onMouseEnter={() => handleHover(doctor.id)}
                            onMouseLeave={() => handleHover(doctor.id)}
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotateY: flipped[doctor.id] ? 360 : 0 }}
                                transition={{ duration: 1 }}
                                className="absolute inset-0 w-full h-full"
                                style={{ backfaceVisibility: "hidden" }}
                            >
                                <Image
                                    src={flipped[doctor.id] ? doctor.imageBack : doctor.imageFront}
                                    alt={doctor.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-xl"
                                />
                            </motion.div>
                        </div>

                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-semibold text-gray-800 flex justify-center items-center gap-2">
                                <User className="text-blue-500" /> {doctor.name}
                            </h2>
                            <p className="text-gray-600 mt-2 flex justify-center items-center gap-2">
                                <Stethoscope className="text-green-500" /> {doctor.speciality}
                            </p>
                            <p className="text-gray-500 mt-2 flex justify-center items-center gap-2">
                                <Clock className="text-red-500" /> {doctor.experience}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Doctors;