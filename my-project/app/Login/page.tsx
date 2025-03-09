"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import "../SignUp/stylePage.css";
import Link from 'next/link';

const CHECK_LOGIN_URL = "http://localhost:5000/api/check-login"; // تحقق من الجلسة
const Login = () => {
    const router = useRouter();
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorCheckLoginStatus, setErrorCheckLoginStatus] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // حالة تسجيل الدخول

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorPassword(e.target.value.length < 8 ? "كلمة المرور يجب أن تكون على الأقل 8 أحرف." : "");
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setErrorEmail(!emailPattern.test(e.target.value) ? "البريد الإلكتروني غير صالح." : "")
    };
    const checkLoginStatus = async () => {
        try {
            const response = await fetch(CHECK_LOGIN_URL, {
                method: "GET",
                credentials: "include", // هام جدًا لإرسال ملفات تعريف الارتباط (Cookies)
            });

            const data = await response.json();
            setIsLoggedIn(data.isLoggedIn);
            console.log("data.isLoggedIn", data.isLoggedIn)
            if (!data.isLoggedIn) {
                setErrorCheckLoginStatus("");
            } else {
                setErrorCheckLoginStatus("المستخدم موجود بالفعل");
                router.push("/");
                return data.isLoggedIn;
            }
            return data.isLoggedIn;

        } catch (err) {
            setErrorCheckLoginStatus("حدث خطأ أثناء التحقق من حالة تسجيل الدخول يرجى المحاولة لاحقا. ");
            return false;
        }
    };
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        if (!email || !password) {
            setErrorMessage("يرجى ملء جميع الحقول.");
            return;
        }

        if (await checkLoginStatus()) {
            console.log(" You are already logged in .")
            return;
        }
        try {
            // هون الغلط 
            //🔹 1. التحقق مما إذا كان البريد الإلكتروني مسجلاً أم لا
            const checkRegisterResponse = await fetch(`http://localhost:5000/api/check-register?email=${email}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // لإرسال الكوكيز
            });

            const checkRegisterData = await checkRegisterResponse.json();
            console.log("checkRegisterData :  ", checkRegisterData)
            if (!checkRegisterData.registered) {
                setErrorMessage("هذا البريد الإلكتروني غير مسجل. الرجاء التسجيل أولاً.");
                return;
            }
        } catch (err: any) {
            setErrorMessage("حدث خطأ أثناء تسجيل الدخول");
            return;
        }
        try {
            const loginResponse = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
            const data = await loginResponse.json()
            console.log(loginResponse)
            if (loginResponse) {
                localStorage.setItem("userEmail", email); // 🔹 حفظ الإيميل
                localStorage.setItem("isLoggedIn", "true")
                setSuccessMessage("تم تسجيل الدخول بنجاح")
                router.push("/");
            }
            else {
                setErrorMessage("فشل تسجيل الدخول، تحقق من البيانات.");
            }
        } catch (err: any) {
            setErrorMessage("حدث خطأ أثناء تسجيل الدخول");
        }

    };

    return (
        <div className="flex justify-center align-content-center my-10">
            <div className="rounded-lg shadow-lg relative overflow-hidden w-96 min-h-96">
                <div className="mt-10">
                    <form className="flex flex-col items-center justify-center px-12" onSubmit={handleLogin}>
                        <h1 className="text-2xl text-black/50 font-black tracking-wider mb-5">تسجيل الدخول</h1>

                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={errorEmail ? "input-error" : ""}
                        />
                        {errorEmail && <p className="error-message">{errorEmail}</p>}

                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={errorPassword ? "input-error" : ""}
                        />
                        {errorPassword && <p className="error-message">{errorPassword}</p>}

                        <p className="text-darkColor/55 pt-2">هل نسيت كلمة السر ؟ </p>
                        <button
                            type="submit"
                            className="bg-black/50 text-xs font-bold border-none hover:text-darkColor outline-none tracking-wider my-5 uppercase duration-700 w-40 py-3 text-white/90 rounded-lg"
                        >
                            تسجيل الدخول
                        </button>
                        {errorMessage && <p className="error-message py-3 text-center">{errorMessage}</p>}
                        {successMessage && <p className="success-message py-3 text-center">{successMessage}</p>}
                        {errorCheckLoginStatus && <p className="error-message py-3 text-center">{errorCheckLoginStatus}</p>}
                        <Link href="/admin">هل انت المدير ؟</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;