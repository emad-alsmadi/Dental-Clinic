"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response2 = await fetch("http://localhost:5000/api/check-login", {
                    method: "GET",
                    credentials: "include",
                });
                const response3 = await fetch("http://localhost:5000/api/check-admin", {
                    method: "GET",
                    credentials: "include",
                });

                const data2 = await response2.json();
                const data3 = await response3.json();
                console.log("login :", data2.isLoggedIn);
                console.log("login admin:", data3.isAdmin);
                setIsLoggedIn(data2.isLoggedIn);
                setIsAdmin(data3.isAdmin);

                if (!data2.isLoggedIn && !data3.isAdmin) {
                    router.push("/Login"); // توجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن مسجلاً
                }
            } catch (error) {
                console.error("خطأ في التحقق من الجلسة:", error);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    return {isLoading, isLoggedIn, isAdmin };
}