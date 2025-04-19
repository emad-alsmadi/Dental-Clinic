"use client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import Cards from "@/components/dashboard/Cards";
const Dashboard = () => {
    const { toast } = useToast();
    const { isLoading, isAdmin } = useAuthAdmin();
    const router = useRouter();
    // إعادة توجيه المستخدم إذا لم يكن Admin
    useEffect(() => {
        if (!isAdmin && !isLoading) {
            router.push("/auth/login");
            toast({
                variant: "destructive",
                title: "خطأ!",
                description: "انت لست مدير",
            });
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