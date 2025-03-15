"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import Link from 'next/link';

const pageAdmin = () => {
    const LOGIN_ADMIN_URL = "http://localhost:5000/api/login-admin"; // تحقق من الجلسة
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorCheckLoginStatus, setErrorCheckLoginStatus] = useState("");

    const { isAdmin } = useAuthAdmin();

    const router = useRouter();


    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorPassword(e.target.value.length < 8 ? "كلمة المرور يجب أن تكون على الأقل 8 أحرف." : "");
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setErrorEmail(!emailPattern.test(e.target.value) ? "البريد الإلكتروني غير صالح." : "")
    };

    const handleLoginAdmin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setErrorCheckLoginStatus("");
        if (!email || !password) {
            setErrorMessage("يرجى ملء جميع الحقول.");
            return;
        }
        if (isAdmin) {
            setErrorCheckLoginStatus(" انت مسجل دخول بالفعل");
            router.push("/");
            return;
        } else {
            try {
                const loginAdminResponse = await fetch(LOGIN_ADMIN_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ email, password }),
                });

                const data = await loginAdminResponse.json();

                if (loginAdminResponse.ok) {
                    localStorage.setItem("adminEmail", email);
                    localStorage.setItem("isAdmin", "true");
                    localStorage.setItem("isLoggedIn", "true")
                    setSuccessMessage("تم تسجيل الدخول بنجاح");
                    router.push("/"); // ✅ توجيه المستخدم بعد تسجيل الدخول
                } else {
                    setErrorMessage("فشل تسجيل الدخول، تحقق من البيانات.");
                }
            } catch (err) {
                setErrorMessage("حدث خطأ أثناء تسجيل الدخول");
            }
        }
    };
    return (
        <div>
            <div className="flex justify-center align-content-center my-10">
                <div className="bg-blue-400 rounded-lg shadow-lg relative overflow-hidden w-96 min-h-96">
                    <div className="mt-10">
                        <form className="flex flex-col items-center justify-center px-12" onSubmit={handleLoginAdmin}>
                            <h1 className="text-2xl text-black/50 font-black tracking-wider mb-5">لوحة تسجيل دخول المدير </h1>
                            <input
                                type="email"
                                placeholder="البريد الإلكتروني"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={errorEmail ? "input-error" : ""}
                            />
                            {errorEmail && <p className="text-red-500">{errorEmail}</p>}

                            <input
                                type="password"
                                placeholder="كلمة المرور"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={errorPassword ? "input-error" : ""}
                            />
                            {errorPassword && <p className="text-red-500">{errorPassword}</p>}

                            <p className="text-darkColor/55 pt-2">هل نسيت كلمة السر ؟ </p>
                            <button
                                type="submit"
                                className="bg-black/50 text-xs font-bold border-none hover:text-darkColor outline-none tracking-wider my-5 uppercase duration-700 w-40 py-3 text-white/90 rounded-lg"
                            >
                                تسجيل الدخول
                            </button>
                            {errorMessage && <p className="text-red-500 py-3 text-center">{errorMessage}</p>}
                            {successMessage && <p className="text-green-600 py-3 text-center">{successMessage}</p>}
                            {errorCheckLoginStatus && <p className="text-red-500 py-3 text-center">{errorCheckLoginStatus}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default pageAdmin;
