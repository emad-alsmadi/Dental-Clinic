"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
export default function FAQPage() {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl text-center font-bold text-darkColor/90 mb-8">الأسئلة الأكثر شيوعاً</h1>
                <p className="text-center text-sm text-gray-700/80 mb-8">
                    اعرف أكثر عن منصة اودينتال وخدمات وسياسات الرعاية الصحية عن بعد وكيفية استخدام خدماتنا بكل سهولة ويسر.
                </p>

                <div className="space-y-6">
                    {/* القسم الأول: ما هي منصة اودينتال؟ */}
                    <motion.section
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <motion.h2
                            onClick={() => toggleSection("whatIs")}
                            className="text-lg font-semibold text-blue-800 mb-4 cursor-pointer"
                        >
                            ما هي منصة اودينتال للرعاية الصحية؟
                        </motion.h2>
                        <AnimatePresence>
                            {openSection === "whatIs" && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="text-gray-600 leading-relaxed overflow-hidden mt-4 pl-8"
                                >
                                    منصة اودينتال، المنصة الأولى في الوطن العربي التي تقدم خدمات الاستشارات الطبية عن بعد وتتبع للمرضى. التواصل مع الأطباء المعتمدين يتم من خلال إمكانية مناقشة أو محادثة صوتية وهي المنصة اودينتالة العربية الوحيدة التي تعمل بتقديم الاستشارات اودينتالة الموثوقة.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.section>

                    {/* القسم الثاني: ما هي خدمات منصة اودينتال؟ */}
                    <motion.section
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <motion.h2
                            onClick={() => toggleSection("services")}
                            className="text-lg font-semibold text-blue-800 mb-4 cursor-pointer"
                        >
                            ما هي خدمات منصة اودينتال؟
                        </motion.h2>
                        <AnimatePresence>
                            {openSection === "services" && (
                                <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="list-disc  text-gray-600 space-y-2 overflow-hidden"
                                >
                                    <li>الاستشارات اودينتالة عن بعد</li>
                                    <li>تتبع حالة المرضى</li>
                                    <li>مناقشة الحالات مع الأطباء</li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </motion.section>

                    {/* القسم الثالث: هل الاستشارات اودينتالة سرية وآمنة؟ */}
                    <motion.section
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <motion.h2
                            onClick={() => toggleSection("privacy")}
                            className="text-lg font-semibold text-blue-800 mb-4 cursor-pointer"
                        >
                            هل الاستشارات اودينتالة عن بعد سرية وآمنة؟
                        </motion.h2>
                        <AnimatePresence>
                            {openSection === "privacy" && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }} className="text-gray-600 leading-relaxed overflow-hidden"
                                >
                                    نعم، جميع الاستشارات اودينتالة على منصة اودينتال سرية وآمنة. نحن نلتزم بأعلى معايير الخصوصية والأمان لحماية بيانات المرضى.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.section>

                    {/* القسم الرابع: كيف يمكن التسجيل في اودينتال؟ */}
                    <motion.section
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <motion.h2
                            onClick={() => toggleSection("registration")}
                            className="text-lg font-semibold text-blue-800 mb-4 cursor-pointer"
                        >
                            كيف يمكن التسجيل في اودينتال؟
                        </motion.h2>
                        <AnimatePresence>
                            {openSection === "registration" && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="text-gray-600 leading-relaxed overflow-hidden"
                                >
                                    يمكنك التسجيل في منصة اودينتال بسهولة من خلال زيارة موقعنا الإلكتروني وإنشاء حساب جديد. بعد التسجيل، يمكنك البدء في استخدام خدماتنا فورًا.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.section>

                    {/* القسم الخامس: هل الاستشارات اودينتالة مجانية؟ */}
                    <motion.section
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <motion.h2
                            onClick={() => toggleSection("freeConsultation")}
                            className="text-lg font-semibold text-blue-800 mb-4 cursor-pointer"
                        >
                            هل الاستشارات اودينتالة مجانية؟
                        </motion.h2>
                        <AnimatePresence>
                            {openSection === "freeConsultation" && (
                                <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="list-disc text-gray-600 space-y-2 overflow-hidden"
                                >
                                    <li>كم اسعار الحجوزات في خدمات اودينتال  عن بعد؟</li>
                                    <li>كيف يمكنني الحصول على استشارة طبية؟</li>
                                    <li>هل يمكنني إجراء استشارة طبية عبر الجوال؟</li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </motion.section>
                </div>

                {/* قسم التواصل معنا */}
                <div className="mt-12 text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="text-white rounded-sm text-base font-semibold p-3 bg-blue-800 mb-4">
                        <Link href="/contact">تواصل معنا</Link>
                    </motion.button>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        إذا كان لديك أي أسئلة إضافية، لا تتردد في التواصل معنا عبر البريد الإلكتروني أو الهاتف.
                    </p>
                </div>
            </div>
        </div>
    );
}