"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuthAdmin() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuthAdmin = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/check-admin", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();

                console.log("login admin:", data.isAdmin);
                setIsAdmin(data.isAdmin);

                if (!data.isAdmin) {
                    router.push("/admin"); // توجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن مسجلاً
                }
            } catch (error) {
                console.error("خطأ في التحقق من الجلسة:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthAdmin();
    }, []);

    return { isLoading, isAdmin };
}