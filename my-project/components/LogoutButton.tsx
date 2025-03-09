"use client";
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
                router.push("/Login");
            } else {
                console.error("فشل تسجيل الخروج.");
            }
        } catch (error) {
            console.error("حدث خطأ أثناء تسجيل الخروج:", error);
        }
    };

    return (
        <Link href="/" onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Logout
        </Link>
    );
};

export default LogoutButton;
