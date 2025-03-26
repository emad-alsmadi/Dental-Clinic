"use client";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";

// مكون رسائل الخطأ
const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center text-red-500 text-sm mt-2">
        <AlertCircle className="mr-2" />
        {message}
    </div>
);

// مكون رسائل النجاح
const SuccessMessage = ({ message }: { message: string }) => (
    <div className="flex items-center text-green-500 text-sm mt-2">
        <CheckCircle className="mr-2" />
        {message}
    </div>
);

const Login = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<{ message: string; type: string } | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [loading, setloading] = useState<boolean>(false);

    // تحقق عند تحميل المكون
    useEffect(() => {
        if (isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn, router]);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(e.target.value)) {
            setError({ message: "البريد الإلكتروني غير صالح.", type: "email" });
        } else {
            setError(null);
        }
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
            setError({ message: "كلمة المرور يجب أن تكون على الأقل 8 أحرف.", type: "password" });
        } else {
            setError(null);
        }
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setError({ message: "يرجى ملء جميع الحقول.", type: "general" });
            return;
        }

        if (error) return;

        try {
            setloading(true);
            const checkRegisterResponse = await fetch(`http://localhost:5000/api/check-register?email=${encodeURIComponent(email)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const checkRegisterData = await checkRegisterResponse.json();
            if (!checkRegisterData.registered) {
                setError({ message: "هذا البريد الإلكتروني غير مسجل. الرجاء التسجيل أولاً.", type: "general" });
                return;
            }
            // 
            const loginResponse = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            if (loginResponse.ok) {
                setSuccessMessage("تم تسجيل الدخول بنجاح!");
                window.localStorage.setItem("isLoggIn", "true");
                setTimeout(() => {
                    router.push("/");
                }, 500);
            } else {
                setError({ message: "فشل تسجيل الدخول، تحقق من البريد الإلكتروني وكلمة المرور.", type: "general" });
            }
        } catch (error) {
            setError({ message: "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.", type: "general" });
        } finally {
            setloading(false);
        }
    
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full  max-w-sm md:max-w-md lg:max-w-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">تسجيل الدخول</h1>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* حقل البريد الإلكتروني */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            value={email}
                            onChange={handleEmailChange}
                            className={`w-full rounded-lg p-3 pl-10 focus:outline-none ${error?.type === "email" ? "border border-red-600"
                                : "border border-gray-300 focus:ring-2 focus:ring-blue-400"}`}
                        />
                    </div>

                    {/* حقل كلمة المرور */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            value={password}
                            onChange={handlePasswordChange}
                            className={`w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none
                                    ${error?.type === "password" ? "border-red-600" :
                                    "focus:ring-2 focus:ring-blue-400"}`}
                        />
                    </div>
                    {error && <ErrorMessage message={error.message} />}

                    {successMessage && <SuccessMessage message={successMessage} />}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
                    >
                        {loading ? " ...جاري تسجيل الدخول" : "تسجيل الدخول"}
                    </button>
                </form>

                <div className="text-center mt-5">
                    <Link href="#" className="text-blue-500 hover:underline">
                        هل نسيت كلمة السر؟
                    </Link>
                </div>

                <div className="text-center mt-3">
                    <Link href="/admin" className="text-gray-600 hover:underline">
                        هل أنت المدير؟
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
export default Login;