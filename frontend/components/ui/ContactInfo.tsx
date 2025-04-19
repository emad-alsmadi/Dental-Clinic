"use client";
import { Phone, Stethoscope, CalendarClock, Globe } from 'lucide-react';
import { motion } from "framer-motion";
const ContactInfo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:flex-row justify-around text-right my-8" dir="rtl">
            {/* عنصر الاستعادات */}
            <div className="flex items-center justify-end mb-4 bg-white p-6 rounded-lg shadow-md">
                <Phone className="text-blue-500" size={24} />
                <div className="mr-3">
                    <h3 className="font-bold text-lg">الأستعلامات</h3>
                    <p className="text-gray-700">963996171681</p>
                </div>
            </div>

            {/* عنصر التخصصات */}
            <div className="flex items-center justify-end mb-4 bg-white p-6 rounded-lg shadow-md">
                <Stethoscope className="text-green-500" size={24} />
                <div className="mr-3">
                    <h3 className="font-bold text-lg">التخصصات</h3>
                    <p className="text-gray-700">92004531212</p>
                </div>
            </div>

            {/* عنصر المروع */}
            <div className="flex items-center justify-end mb-4 bg-white p-6 rounded-lg shadow-md">
                <CalendarClock className="text-purple-500" size={24} />
                <div className="mr-3">
                    <h3 className="font-bold text-lg">الفروع</h3>
                    <p className="text-gray-700">92004531212</p>
                </div>
            </div>

            {/* عنصر ساعات العمل */}
            <div className="flex items-center justify-end mb-4 bg-white p-6 rounded-lg shadow-md">
                <Globe className="text-orange-500" size={24} />
                <div className="mr-3">
                    <h3 className="font-bold text-lg">ساعات العمل</h3>
                    <p className="text-gray-700">تصفح الموقع</p>
                </div>
            </div>
        </motion.div>
    );
}
export default ContactInfo;