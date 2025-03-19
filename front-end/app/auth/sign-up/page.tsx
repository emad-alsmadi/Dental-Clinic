"use client";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useCheckRegister from "@/hooks/useCheckRegister";

const SignUp = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordR: "",
    });

    const [errors, setErrors] = useState({ email: "", password: "", message: "" });
    const [statusMessage, setStatusMessage] = useState({ success: "", error: "" });

    const { checkRegisterStatus, error } = useCheckRegister();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "password") {
            setErrors({ ...errors, password: value.length < 8 ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل.": ""});
        } else if (name === "email") {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            setErrors({ ...errors, email: emailPattern.test(value) ? "" : "البريد الإلكتروني غير صالح." });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({ email: "", password: "", message: "" });
        setStatusMessage({ success: "", error: "" });

        if (!formData.username || !formData.password || !formData.passwordR || !formData.email) {
            setErrors({ ...errors, message: "يرجى ملء جميع الحقول." });
            console.log("full out form")
            return;
        }

        if (formData.password !== formData.passwordR) {
            setErrors({ ...errors, password: "كلمة المرور غير متطابقة." });
            return;
        }

        if (errors.password || errors.email || errors.message) return;

        const userExists = await checkRegisterStatus(formData.email);
        if (userExists.registered) {
            setStatusMessage({ ...statusMessage, error: "البريد الإلكتروني مستخدم بالفعل." });
            return;
        };

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });

            if (response.status === 201) {
                setStatusMessage({ error:"", success: "تم التسجيل بنجاح" });
                setTimeout(() => {
                    router.push("/");
                }, 1500);
                localStorage.setItem("userEmail", formData.email);
                localStorage.setItem("isLoggedIn", "true");
                console.log("login successful")
                
            } else {
                setStatusMessage({ ...statusMessage, error: "حدث خطأ أثناء التسجيل" });
            }
        } catch {
            setStatusMessage({ ...statusMessage, error: "حدث خطأ في الاتصال بالسيرفر" });
        }
    };

    return (
        <motion.div
            className="flex justify-center items-center my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="bg-white/70 rounded-lg shadow-lg relative overflow-hidden w-96 min-h-96 p-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                    <h1 className="text-2xl text-black/50 font-black tracking-wider mb-4">التسجيل</h1>

                    <input type="text" name="username" placeholder="اسم المستخدم" value={formData.username} onChange={handleChange}
                        className="bg-gray-200 my-2 px-3 py-2 text-sm w-full rounded-lg border-none outline-none" />

                    <input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange}
                        className={`bg-gray-200 my-2 px-3 py-2 text-sm w-full rounded-lg border-none outline-none ${errors.email && "border border-red-500"}`} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    <input type="password" name="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange}
                        className={`bg-gray-200 my-2 px-3 py-2 text-sm w-full rounded-lg border-none outline-none ${errors.password && "border border-red-500"}`} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                    <input type="password" name="passwordR" placeholder="تأكيد كلمة المرور" value={formData.passwordR} onChange={handleChange}
                        className={`bg-gray-200 my-2 px-3 py-2 text-sm w-full rounded-lg border-none outline-none ${errors.password && "border border-red-500"}`} />
                    {formData.passwordR !== formData.password && <p className="text-red-500 text-sm">كلمة المرور غير متطابقة.</p>}

                    <motion.button
                        type="submit"
                        className="bg-blue-600 text-sm font-bold hover:text-darkColor tracking-wider mt-4 mb-2 w-40 py-3 text-white rounded-lg hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        التسجيل
                    </motion.button>

                    <p className="mb-4">لديك حساب؟ <Link href="/Login" className="text-blue-800">تسجيل دخول</Link></p>

                    {statusMessage.error && <p className="text-red-500 py-3 text-center">{statusMessage.error}</p>}
                    {statusMessage.success && <p className="text-green-500 py-3 text-center">{statusMessage.success}</p>}
                    {errors.message && <p className="text-red-500 py-2 text-center">{errors.message}</p>}
                </form>
            </motion.div>
        </motion.div>
    );
};

export default SignUp;