"use client";
import { motion } from 'framer-motion';

const JoinPlatformDoctors =()=> {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen bg-blue-100/50 p-4"
        >
            <div className="p-6 w-full max-w-6xl mx-auto"> {/* تحديد عرض أقصى للصفحة */}
                <h1 className="text-2xl md:text-4xl text-center mb-6">انضم إلى منصة الأطباء</h1>
                <p className="text-center text-gray-700/70 mb-8 text-sm md:text-base">
                    يرجى تحديد تخصصك وبلد إقامتك لمعرفة أفضل طريقة الانضمام إلى منصتنا الطبية.
                </p>

                <div className="flex flex-col md:flex-row justify-between gap-6"> {/* استخدام Flexbox بشكل متجاوب */}
                    {/* الكارد الأول */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-[45%] flex flex-col items-center justify-between bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <div className='py-4 md:py-8 text-center'>
                            <h2 className="font-semibold mb-4 text-lg">شارك خبرتك الطبية مع الأطباء والمرضى</h2>
                            <p className="text-gray-600 text-sm">
                                يمكنك طبيبًا متخصصًا، يمكنك الانضمام إلى مجتمع الأطباء العرب والمساهمة في الإجابة عن الأسئلة الطبية. ومشاركة خبرتك مع أهداف الأطباء والمرضى، وتنمية حضورك المهني عبر الإنترنت.
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="min-w-[50%] bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-semibold px-5 py-2 md:py-3 rounded-sm transition duration-300"
                        >
                            انضم إلى مجتمع الأطباء
                        </button>
                    </motion.div>

                    {/* الكارد الثاني */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-[45%] flex flex-col items-center justify-between bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <div className='py-4 md:py-8 text-center'>
                            <h2 className="font-semibold mb-4 text-lg">انضم إلى عيادتنا وابدء بتقديم خدماتك الطبية للمرضى</h2>
                            <p className="text-gray-600 text-sm">
                                يمكنك الانضمام إلى منصتنا والبدء في تقديم الاستشارات الطبية عبر الإنترنت.
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="min-w-[50%] bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-bold px-5 py-2 md:py-3 rounded-sm transition duration-300"
                        >
                            انضم إلى خدمة اودينتال عن بعد
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
export default JoinPlatformDoctors;