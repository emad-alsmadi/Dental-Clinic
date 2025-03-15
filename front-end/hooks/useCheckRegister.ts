import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

const CHECK_REGISTER_URL = "http://localhost:5000/api/check-register";

const useCheckRegister = () => {
    const [error, setError] = useState<string | null>("");
    const [isRegisterd, setIsRegisterd] = useState<boolean>(false);

    const checkRegisterStatus = async (email: string) => {
        setError("");
        try {
            const respons = await fetch(`${CHECK_REGISTER_URL}?email=${encodeURIComponent(email)}`, {
                method: "GET",
                credentials: "include",
            });
            if (!respons.ok) {
                setError("فشل التحقق من التسجيل");
            }
            const data = await respons.json();
            if (data.registered) {
                console.log("data.registerd is reggggggggggggggg");
                setError(" هذا البريد الألكتروني مسجل بالفعل , يرجى تسجيل الدخول بدلا من ذلك . ");
                setIsRegisterd(true)
            } else {
                setIsRegisterd(false)
                console.log("data.registerd is notttt reggggggggggggggg");
            }
            return data;
        } catch (err: any) {
            setError("حدث خطأ أثناء التحقق من حالة التسجيل، يرجى المحاولة لاحقاً.");
            return null;
        }
    }
    return {checkRegisterStatus , error , isRegisterd}
}
export default useCheckRegister;
