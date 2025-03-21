"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from 'next/link';
const LOGOUT_URL = "http://localhost:5000/api/logout"; // رابط الـ API لتسجيل الخروج

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch(LOGOUT_URL, {
                method: "POST",
                credentials: "include", // مهم لإرسال الـ cookies
            });

            if (response) {
                localStorage.removeItem("isLoggedIn"); // إزالة حالة تسجيل الدخول
                localStorage.removeItem("userEmail"); // إزالة بيانات تسجيل الدخول
                localStorage.removeItem("isAdmin"); // إزالة بيانات تسجيل الدخول
                window.location.reload();
            } else {
                console.error("فشل تسجيل الخروج.");
            }
        } catch (error) {
            console.error("حدث خطأ أثناء تسجيل الخروج:", error);
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="text-white bg-darkColor px-6 py-2 rounded-sm"
        >
            <Link href="/" onClick={handleLogout}>
                تسجيل الخروج
            </Link>
        </motion.button>
    );
};

export default LogoutButton;
