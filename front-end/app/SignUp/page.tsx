"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import "./stylePage.css";
import { useRouter } from "next/navigation";

const CHECK_REGISTER_URL = "http://localhost:5000/api/check-register"; // تحقق من الجلسة
const SignUp = () => {

    const router = useRouter()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState<string>("");
    const [passwordR, setPasswordR] = useState("");
    const [email, setEmail] = useState<string>("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorEmailStatus, setErrorEmailStatus] = useState<number>(0);
    const [accept, setAccept] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorCheckRegisterStatus, setErrorCheckRegisterStatus] = useState("");
    const [isRegister, setIsRegister] = useState(true); // حالة تسجيل الدخول

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
            setErrorPassword("كلمة المرور يجب أن تكون على الأقل 8 أحرف.");
        } else {
            setErrorPassword("");
        }
    };

    const handlePasswordRChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordR(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(e.target.value)) {
            setErrorEmail("البريد الإلكتروني غير صالح.");
        } else {
            setErrorEmail("");
        }
    };

    const checkRegisterStatus = async () => {
        setErrorCheckRegisterStatus("");
        if (!email) {
            setErrorCheckRegisterStatus("يرجى إدخال البريد الإلكتروني للتحقق.");
            return;
        }
        try {
            const response = await fetch(`${CHECK_REGISTER_URL}?email=${encodeURIComponent(email)}`, {
                method: "GET",
                credentials: "include", // لإرسال الكوكيز
            });

            if (!response) {
                throw new Error("فشل التحقق من التسجيل");
            }

            const data = await response.json();

            if (data.registered) {
                setErrorCheckRegisterStatus("المستخدم مسجل بالفعل");
                setIsRegister(true);
                router.push("/");
                return;
            }
            setErrorCheckRegisterStatus("");
            setIsRegister(false);
        } catch (err) {
            console.log("The Error", err);
            setErrorCheckRegisterStatus("حدث خطأ أثناء التحقق من حالة التسجيل، يرجى المحاولة لاحقاً.");
        }
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage("")
        setErrorPassword("")
        setErrorMessage("");
        if (!username || !password || !passwordR || !email) {
            setErrorMessage("يرجى ملء جميع الحقول.");
            return;
        }
        if (password !== passwordR) {
            e.preventDefault(); ``
            setErrorPassword("كلمة المرور غير متطابقة");
            return;
        }

        await checkRegisterStatus(); // 🔹 انتظر نتيجة التحقق أولاً


        console.log("hhhhhh no")
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // لإرسال الكوكيز
                body: JSON.stringify({ email, password }),
            });
            if (response.status === 201) {
                setSuccessMessage("تم التسجيل بنجاح")
                localStorage.setItem("userEmail", email); // 🔹 حفظ الإيميل
                localStorage.setItem("isLoggedIn", "true")
                router.push("/"); // 🔹 توجيه المستخدم إلى صفحة الحجز
            } else {
                const errorData = await response.json();
                Error(errorData.error || "حدث خطأ أثناء التسجيل");
            }
        } catch (error) {
            Error("حدث خطأ في الاتصال بالسيرفر");
        }
    };


    return (
        <div className="flex justify-center align-content-center mb-20 mt-8">
            <div className="bg-white/70 rounded-lg shadow-lg relative overflow-hidden w-96 min-h-96">
                <div className="mt-20">
                    <form className="flex flex-col items-center justify-center px-12" onSubmit={handleSubmit}>
                        <h1 className="text-2xl text-black/50 font-black tracking-wider mb-5">التسجيل</h1>

                        <input
                            type="text"
                            placeholder="اسم المستخدم"
                            name="name"
                            required
                            value={username}
                            onChange={handleUserNameChange}
                            className={errorUsername ? "input-error" : ""}
                        />
                        {errorUsername && <p className="error-message">{errorUsername}</p>}

                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={errorEmail ? "input-error" : ""}
                        />
                        {errorEmail && <p className="error-message">{errorEmail}</p>}
                        {errorEmailStatus === 422 && accept && (
                            <p className="error-message">البريد الإلكتروني مستخدم بالفعل.</p>
                        )}

                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={errorPassword ? "input-error" : ""}
                        />
                        {errorPassword && <p className="error-message">{errorPassword}</p>}

                        <input
                            type="password"
                            placeholder="تأكيد كلمة المرور"
                            name="password_confirmation"
                            value={passwordR}
                            onChange={handlePasswordRChange}
                            className={passwordR !== password && accept ? "input-error" : ""}
                        />
                        {passwordR !== password && accept && (
                            <p className="error-message">كلمة المرور غير متطابقة.</p>
                        )}<button
                            type="submit"
                            className="bg-blue-600 text-xs font-bold border-none hover:text-darkColor outline-none tracking-wider my-5 uppercase duration-700 w-40 py-3 text-white/90 rounded-lg"
                        >
                            التسجيل
                        </button>
                        {errorMessage && <p className="error-message py-3">{errorMessage}</p>}
                        {successMessage && <p className="success-message py-3">{successMessage}</p>}
                        {errorCheckRegisterStatus && <p className="error-message py-3 text-lg">{errorCheckRegisterStatus}</p>}
                    </form>

                </div>
            </div>
        </div>
    );
};

export default SignUp;