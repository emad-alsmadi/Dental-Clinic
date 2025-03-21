"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
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
const LoginAdmin = () => {
    const LOGIN_ADMIN_URL = "http://localhost:5000/api/login-admin"; // تحقق من الجلسة
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<{ message: string; type: string } | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [loading, setloading] = useState<boolean>(false);
    const { isAdmin } = useAuthAdmin();

    const router = useRouter();


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

    const handleLoginAdmin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setError({ message: "يرجى ملء جميع الحقول.", type: "general" });
            return;
        }

        if (error) return;

        if (isAdmin) {
            setError({ message: " انت مسجل دخول بالفعل", type: "general" });
            router.push("/");
            return;
        } else {
            try {
                setloading(true);
                const loginAdminResponse = await fetch(LOGIN_ADMIN_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ email, password }),
                });

                const data = await loginAdminResponse.json();

                if (loginAdminResponse.ok) {
                    setSuccessMessage("تم تسجيل الدخول بنجاح");
                    window.location.reload();
                    router.push("/");
                } else {
                    setError({
                        message: "فشل تسجيل الدخول، تحقق من البيانات.", type: "general"
                    });
                }
            } catch (err) {
                setError({ message: "حدث خطأ أثناء تسجيل الدخول.", type: "general" });
                return;
            } finally {
                setloading(false);
            }
        }
    };
    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center min-h-screen bg-gray-500 px-4">
            <div className="bg-slate-400 shadow-lg rounded-lg p-8 w-full max-w-sm md:max-w-md lg:max-w-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">لوحة المدير</h1>

                <form onSubmit={handleLoginAdmin} className="space-y-5">
                    {/* حقل البريد الإلكتروني */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            value={email}
                            onChange={handleEmailChange}
                            className={`w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none
                                    ${error?.type === " email" ? "border border-red-600"
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
                                    ${error?.type === " password" ? "border border-red-600"
                                    : "border border-gray-300 focus:ring-2 focus:ring-blue-400"}`}
                        />
                    </div>
                    {error && <ErrorMessage message={error.message} />}

                    {successMessage && <SuccessMessage message={successMessage} />}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300
                        flex justify-center items-center"
                    >
                        {loading ? " ...جاري تسجيل الدخول" : "تسجيل الدخول"}
                    </button>
                </form>

                <div className="text-center mt-5">
                    <Link href="#" className="text-blue-500 hover:underline">
                        هل نسيت كلمة السر؟
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
export default LoginAdmin;