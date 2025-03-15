"use client";
import useAuth from "@/hooks/useAuth";

const AuthChecker =() => {
    const { isLoggedIn, isAdmin } = useAuth();

    if (!isLoggedIn && !isAdmin) return null; // سيتم إعادة توجيه المستخدم تلقائيًا إلى صفحة تسجيل الدخول

}
export default AuthChecker;