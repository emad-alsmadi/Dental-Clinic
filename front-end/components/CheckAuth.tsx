"use client";
import useAuth from "@/hooks/useAuth";

const AuthChecker =() => {
    const { isLoading, isLoggedIn, isAdmin } = useAuth();

    if (isLoading) return <p className="flex items-kfcenter justify-center my-36">جارٍ التحقق من تسجيل الدخول...</p>;

    if (!isLoggedIn && !isAdmin) return null; // سيتم إعادة توجيه المستخدم تلقائيًا إلى صفحة تسجيل الدخول

}
export default AuthChecker;