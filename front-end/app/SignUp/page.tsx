"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import "./stylePage.css";
import { useRouter } from "next/navigation";
import useCheckRegister from "@/hooks/useCheckRegister";

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

    const { checkRegisterStatus, error, isRegisterd } = useCheckRegister();
    
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
            e.preventDefault();
            setErrorPassword("كلمة المرور غير متطابقة");
            return;
        }

        const userExists = await checkRegisterStatus(email);
        console.log("userExists :      ", userExists);
        if (userExists.registered) {
            //router.push("/Login")
            return;
        }
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
        <div className="flex justify-center align-content-center mb-10 mt-8">
            <div className="bg-white/70 rounded-lg shadow-lg relative overflow-hidden w-96 min-h-96">
                <div className="mt-10">
                    <form className="flex flex-col items-center justify-center px-12" onSubmit={handleSubmit}>
                        <h1 className="text-2xl text-black/50 font-black tracking-wider mb-5">التسجيل</h1>

                        <input
                            type="text"
                            placeholder="اسم المستخدم"
                            name="name"
                            required
                            value={username}
                            onChange={handleUserNameChange}
                            className={errorUsername ? "border border-red-500" : ""}
                        />
                        {errorUsername && <p className="text-red-500">{errorUsername}</p>}

                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={errorEmail ? "border border-red-500" : ""}
                        />
                        {errorEmail && <p className="text-red-500">{errorEmail}</p>}
                        {errorEmailStatus === 422 && accept && (
                            <p className="text-red-500">البريد الإلكتروني مستخدم بالفعل.</p>
                        )}

                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={errorPassword ? "border border-red-500" : ""}
                        />
                        {errorPassword && <p className="text-red-500">{errorPassword}</p>}

                        <input
                            type="password"
                            placeholder="تأكيد كلمة المرور"
                            name="password_confirmation"
                            value={passwordR}
                            onChange={handlePasswordRChange}
                            className={passwordR !== password && accept ? "border border-red-500" : ""}
                        />
                        {passwordR !== password && accept && (
                            <p className="text-red-500">كلمة المرور غير متطابقة.</p>
                        )}<button
                            type="submit"
                            className="bg-blue-600 text-xs font-bold border-none hover:text-darkColor outline-none tracking-wider my-5 uppercase duration-700 w-40 py-3 text-white/90 rounded-lg"
                        >
                            التسجيل
                        </button>
                        {errorMessage && <p className="text-red-500 py-3 text-center">{errorMessage}</p>}
                        {successMessage && <p className="success-message py-3 text-center">{successMessage}</p>}
                        {error && <p className="text-red-500 py-3 text-lg text-center">{error}</p>}
                    </form>

                </div>
            </div>
        </div>
    );
};

export default SignUp;