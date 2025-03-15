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
                const response = await fetch("http://localhost:5000/api/check-login", {
                    method: "GET",
                    credentials: "include",
                });
                const response2 = await fetch("http://localhost:5000/api/check-admin", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();
                const data2 = await response2.json();

                console.log("login :", data.isLoggedIn);
                console.log("login admin:", data2.isAdmin);
                setIsLoggedIn(data.isLoggedIn);
                setIsAdmin(data2.isAdmin);

                if (!data.isLoggedIn && !data2.isAdmin) {
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

    return { isLoading, isLoggedIn, isAdmin };
}