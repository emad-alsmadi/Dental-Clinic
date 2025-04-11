"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import Cards from "@/app/components/dashboard/Cards";
const Dashboard = () => {
    const { isLoading, isAdmin } = useAuthAdmin();
    const router = useRouter();
    // إعادة توجيه المستخدم إذا لم يكن Admin
    useEffect(() => {
        if (!isAdmin && !isLoading) {
            router.push("/auth/login");
        }
    }, [isLoading, isAdmin, router]);

    return (
        <>
            {!isAdmin ? (
                <p className="flex items-center justify-center my-36 text-lg font-semibold">
                    جارٍ التحقق من تسجيل الدخول...
                </p>
            ) : (
                <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-100">

                    {/* ✅ المحتوى الرئيسي */}
                    <main className="flex-1 p-4 sm:p-6">
                        {/* ✅ بطاقات الإحصائيات */}
                        <Cards />
                    </main>
                </div>
            )}
        </>
    );
};

export default Dashboard;