"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CheckRegister = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkRegister = async () => {
            try {
                const storedEmail = localStorage.getItem("userEmail"); // 🔹 جلب الإيميل من localStorage
                if (!storedEmail) {
                    router.push("/SignUp"); // 🔹 إعادة التوجيه إلى صفحة التسجيل
                    return;
                }

                const response = await fetch("http://localhost:5000/api/check-register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: storedEmail }),
                });

                const data = await response.json();
                if (!data.registered) {
                    router.push("/signup"); // 🔹 إعادة التوجيه إذا لم يكن المستخدم مسجّلًا
                }
            } catch (error) {
                console.error("خطأ أثناء التحقق من التسجيل", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkRegister();
    }, []);

    if (isLoading) {
        return <p>جاري التحقق من التسجيل...</p>;
    }

    return null;
};

export default CheckRegister;