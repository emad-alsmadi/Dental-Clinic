"use client";
import { useEffect, useState } from "react";

interface Booking {
    id: string;
    name: string;
    email: string;
    date: string;
    time: string;
    address: string;
    speciality: string;
    doctor: string;
}

const API_URL = "http://localhost:5000/api/bookings";
const CHECK_LOGIN_URL = "http://localhost:5000/api/check-login"; // تحقق من الجلسة
const CHECK_LOGIN_ADMIN_URL = "http://localhost:5000/api/check-admin"; // تحقق من الجلسة

const Booking = () => {

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isBooked, setIsBooked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [errorCheckLoginStatus, setErrorCheckLoginStatus] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // حالة تسجيل الدخول
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        date: "",
        time: "",
        address: "",
        speciality: "",
        doctor: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    // 🟢 جلب الحجوزات



    // 🟢 التحقق من تسجيل الدخول
    const checkLoginStatus = async () => {
        setErrorCheckLoginStatus("")
        try {
            const response = await fetch(CHECK_LOGIN_URL, {
                method: "GET",
                credentials: "include", // هام جدًا لإرسال ملفات تعريف الارتباط (Cookies)
            });
            const response2 = await fetch(CHECK_LOGIN_ADMIN_URL, {
                method: "GET",
                credentials: "include", // هام جدًا لإرسال ملفات تعريف الارتباط (Cookies)
            });

            const data = await response.json();
            const data2 = await response2.json();
            setIsLoggedIn(data.isLoggedIn);
            console.log(data.isLoggedIn , !data2)
            if (!data.isLoggedIn && !data2) {
                setErrorCheckLoginStatus(" يجب تسجيل الدخول ");
                alert("يجب تسجيل الدخول أولاً!");
                return;
            }
        } catch (err) {
            setErrorCheckLoginStatus("حدث خطأ أثناء التحقق من حالة تسجيل الدخول يرجى المحاولة لاحقا. ");
        }
    };
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.status === 403) {
                alert('ليس لديك صلاحية لحذف هذا الحجز');
                return;
            }

            if (response.status === 401) {
                window.location.href = '/LogIn';
            }
            if (!response.ok) {
                throw new Error("فشل في تحميل الحجوزات");
            }

            const data = await response.json();
            setBookings(data);
        } catch (err: any) {
            setError(err.message || "حدث خطأ أثناء جلب البيانات، حاول مرة أخرى.");
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // إرسال ملفات تعريف الارتباط مع الطلب
                credentials: "include",
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (!response) {
                throw new Error(result.error || "حدث خطأ أثناء إرسال البيانات!");  // إضافة  لتجنب حدوث خطأ إذا كانت result.error غير موجودة
            }

            alert("تم حجز الموعد بنجاح!");
            setFormData({
                name: "",
                email: "",
                contact: "",
                date: "",
                time: "",
                address: "",
                speciality: "",
                doctor: "",
            });
            setIsBooked(true);
        } catch (err: any) {
            console.error("خطأ في الحجز:", err);
            setError(err.message || "تعذر الاتصال بالسيرفر، حاول مرة أخرى.");  // إضافة  لمعالجة الأخطاء بشكل أفضل
        } finally {
            setLoading(false);
        }
    };
    // 🟢 حجز موعد جديد
    useEffect(() => {
        console.log("hi use effect")
        checkLoginStatus();
    }, []);


    return (
        <div className="bg-gray-100 p-10 min-h-screen flex items-center justify-center">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-right">حجز موعد</h2>

                {errorCheckLoginStatus && <p className="text-red-500 text-xl font-bold text-center my-7">{errorCheckLoginStatus}</p>}

                <form onSubmit={handleSubmit} className="text-right">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">الاسم</label>
                        <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" placeholder="أدخل اسمك" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">البريد الإلكتروني</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-gray-700">رقم التواصل</label>
                        <input type="tel" id="contact" value={formData.contact} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700">تاريخ الوصول</label>
                        <input type="date" id="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="time" className="block text-gray-700">وقت الوصول</label>
                        <input type="time" id="time" value={formData.time} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" />
                    </div><div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700">العنوان</label>
                        <input type="text" id="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="speciality" className="block text-gray-700">التخصص</label>
                        <select id="speciality" value={formData.speciality} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" >
                            <option value="">اختر التخصص</option>
                            <option value="dentistry">طب أسنان</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="doctor" className="block text-gray-700">الطبيب</label>
                        <select id="doctor" value={formData.doctor} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" >
                            <option value="">اختر الطبيب</option>
                            <option value="د. سميث">د. سميث</option>
                            <option value="د. عماد الصمادي">د. عماد الصمادي</option>
                            <option value="د. مريم ابراهيم">د. مريم ابراهيم</option>
                            <option value="د. جابر مخلالاتي">د. جابر مخلالاتي</option>
                            <option value="د. غازي حمدان">د. غازي حمدان</option>
                            <option value="د. جونز">د. جونز</option>
                        </select>
                    </div>

                    <div>
                        {/* زر حجز الموعد */}
                        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" disabled={loading}>
                            {loading ? "جاري الحجز..." : "حجز الموعد"}
                        </button>
                    </div>
                </form>

                {isBooked && <p className="my-6 text-green-600 text-center">تم الحجز بنجاح!</p>}

                {error && <p className="my-5 text-red-500 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Booking;