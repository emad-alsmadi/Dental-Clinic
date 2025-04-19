"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, ClipboardCheck, Stethoscope, Download } from "lucide-react";

// البيانات الخاصة بالإحصائيات
const statsData = [
    { id: 1, icon: <User size={50} className="text-blue-500" />, number: 192, suffix: "M", text: "مستخدم سنويا" },
    { id: 2, icon: <ClipboardCheck size={50} className="text-green-500" />, number: 1.5, suffix: "M", text: "توصية طبية" },
    { id: 3, icon: <Stethoscope size={50} className="text-purple-500" />, number: 3, suffix: "M", text: "استشارة طبية" },
    { id: 4, icon: <Download size={50} className="text-teal-500" />, number: 3, suffix: "M", text: "تحميل للتطبيق" },
];

const Stats = () => {
    // حالة لتحديث الأرقام بشكل تدريجي
    const [animatedNumbers, setAnimatedNumbers] = useState(statsData.map(() => 0));

    useEffect(() => {
        const intervals = statsData.map((stat, index) => {
            return setInterval(() => {
                setAnimatedNumbers((prev) => {
                    const newNumbers = [...prev];
                    if (newNumbers[index] < stat.number) {
                        newNumbers[index] = Math.min(newNumbers[index] + stat.number / 100, stat.number);
                    }
                    return newNumbers;
                });
            }, 20); // تحديث الرقم كل 20ms لمظهر انسيابي
        });

        // تنظيف الـ intervals عند تفكيك الكمبوننت
        return () => intervals.forEach(clearInterval);
    }, []);

    return (
        <section className="py-12 bg-gray-100 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">اودينتال في أرقام</h2>
            <p className="text-gray-600 mb-8">أبرز الإنجازات والأرقام التي تعكس جهودنا المستمرة في تقديم خدمات رعاية صحية متميزة وموثوقة</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-auto max-w-5xl">
                {statsData.map((stat, index) => (
                    <motion.div
                        key={stat.id}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div className="bg-blue-100 p-4 rounded-full mb-3">
                            {stat.icon}
                        </div>
                        <motion.p
                            className="text-3xl font-bold text-gray-900"
                            animate={{ opacity: [0, 1], scale: [0.8, 1] }}
                            transition={{ duration: 1 }}
                        >
                            +{animatedNumbers[index].toFixed(1)}
                            {stat.suffix}
                        </motion.p>
                        <p className="text-gray-600 mt-2">{stat.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;