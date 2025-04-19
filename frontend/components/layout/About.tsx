"use client";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import bgImage from "@/public/images/dental-clinic5.png";
import removingStainsFromTeeth from "@/public/images/removing-stains-from-teeth.png";
import dentalImplants from "@/public/images/dental-implants.png";
import { Stethoscope, Microscope, Heart, Hospital, Syringe, Droplet, BriefcaseMedical, Cross, Calendar } from "lucide-react";

const About = () => {
    return (
        <>
            {/* {Head metadata} */}
            <Head>
                <title>من نحن | عيادة الأسنان</title>
                <meta name="description" content="تعرف على فريقنا المتميز وخدماتنا المتطورة في عيادة الأسنان." />
                <meta name="keywords" content="عيادة الأسنان, من نحن, خدمات الأسنان, أطباء الأسنان" />
                <meta property="og:title" content="من نحن | عيادة الأسنان" />
                <meta property="og:description" content="تعرف على فريقنا المتميز وخدماتنا المتطورة في عيادة الأسنان." />
                <meta property="og:url" content="https://yourwebsite.com/about" />
            </Head>

            <div className="bg-gray-100 min-h-screen">
                {/* خلفية الصفحة */}
                <div
                    className="relative min-h-[70vh] flex items-center justify-center text-center text-white bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgImage.src})` }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <motion.h1
                        className="relative text-4xl md:text-5xl font-bold tracking-wide"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        عيادة ODental لطب الأسنان
                    </motion.h1>
                </div>

                {/* 🏥 أقسام العيادة */}
                <div className="container mx-auto py-12">
                    <h2 className="text-3xl font-semibold text-blue-900 text-center mb-8">لماذا تختار عيادتنا؟</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Cross, title: "غرف العلاج", text: "عيادتنا مجهزة بأحدث غرف العلاج والتجميل." },
                            { icon: BriefcaseMedical, title: "أطباء الأسنان", text: "لدينا فريق طبي محترف وكفء." },
                            { icon: Calendar, title: "جداول العمل", text: "الأحد - الخميس: 08:30 - 21:00" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="p-6 bg-white rounded-lg shadow-md text-center transition hover:scale-105 hover:shadow-lg"
                                whileHover={{ scale: 1.05 }}
                            >
                                <item.icon className="mx-auto mb-4 text-blue-500" size={50} />
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 🦷 خدمات العيادة */}
                <div className="bg-white py-12">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-semibold text-blue-900 text-center mb-8">خدماتنا</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: Microscope, title: "تقويم الأسنان", text: "تحسين جماليات الابتسامة." },
                                { icon: Hospital, title: "العمليات بالليزر", text: "علاجات دقيقة وغير مؤلمة." },
                                { icon: Syringe, title: "جراحة الفم", text: "عمليات تجميلية وعلاجية." },
                                { icon: Droplet, title: "تبييض الأسنان", text: "ابتسامة ناصعة البياض." },
                                { icon: Stethoscope, title: "علاج دواعم السن", text: "رعاية متقدمة للثة." },
                                { icon: Heart, title: "زراعة الأسنان", text: "حل دائم للأسنان المفقودة." },
                            ].map((service, index) => (
                                <motion.div
                                    key={index}
                                    className="p-6 bg-gray-100 rounded-lg text-center shadow-sm hover:shadow-md transition"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <service.icon className="mx-auto mb-4 text-blue-500" size={50} />
                                    <h3 className="text-xl font-semibold">{service.title}</h3>
                                    <p className="text-gray-600">{service.text}</p>
                                </motion.div>
                            ))}
                        </div>
                        <div className=" py-8 text-center">
                            <Link href="/booking">
                                <motion.button
                                    className="mt-6 px-6 py-2 bg-[#4CAF50] text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    احجز الآن
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 🏥 حول العيادة */}
                <div className="bg-gray-50 py-12">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-blue-900 mb-6">من نحن؟</h2><p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            عيادة ODental هي وجهتك المثالية للعناية بأسنانك، حيث نقدم أحدث التقنيات في زراعة الأسنان، تقويم الأسنان، وتجميل الابتسامة.
                        </p>
                        <Link href="/contact">
                            <motion.button
                                className="mt-6 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
                                whileHover={{ scale: 1.1 }}
                            >
                                تواصل معنا
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* 🦷 معلومات إضافية */}
                <div className="bg-gray-100 py-12 flex flex-col items-center">
                    {/* قسم زرع الأسنان */}
                    <h1 className="text-4xl">ODental<span className="text-blue-400 ps-6">رعاية طبية</span></h1>
                    <div className="w-full max-w-4xl mb-12">
                        <div className="flex flex-col md:flex-row items-center gap-8 p-6">
                            <Image
                                src={dentalImplants}
                                alt="إزالة التصبغات بالليزر"
                                width={350}
                                height={233}
                            />
                            <div className="flex flex-col text-end ">
                                <h2 className="text-2xl font-bold mb-6">زرع الأسنان</h2>
                                <p className="text-gray-700">
                                    غرسات الأسنان هي جذور أسنان صناعية، وعادة ما تكون مصنوعة من التيتانيوم،
                                    يتم إدخالها في عظام الفك لتعمل مثل جذر السن الطبيعي، مما يساعد على دعم
                                    السن الاصطناعي أو الجسر الثابت.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* قسم إزالة التصبغ بالليزر */}
                    <div className="w-full max-w-4xl">
                        <div className="flex flex-col md:flex-row items-center gap-8 p-6">
                            <div className="flex flex-col text-start ">
                                <h2 className="text-2xl font-bold mb-6">إزالة التصبغ بالليزر</h2>
                                <p className="text-gray-700">
                                    استعادة ابتسامة مشرقة بإزالة التصبغات باستخدام الليزر. تقدم Dentaxia
                                    علاجاً متقدماً لإزالة التصبغات وتبييض الأسنان بالليزر، مما يمنحك
                                    نتائج فورية وفعالة.
                                </p>
                            </div>
                            <Image
                                src={removingStainsFromTeeth}
                                alt="زرع الأسنان"
                                width={350}
                                height={233}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default About;