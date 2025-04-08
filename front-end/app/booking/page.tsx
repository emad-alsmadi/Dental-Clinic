"use client";
import { useToast } from "@/hooks/use-toast"
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { doctors } from "@/constants/doctors";
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

const Booking = () => {
    const { toast } = useToast();



    const [isBooked, setIsBooked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [errorCheckLoginStatus, setErrorCheckLoginStatus] = useState("");
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
    const { isLoading, isLoggedIn, isAdmin } = useAuth();

    if (isLoading) return <p className="flex items-kfcenter justify-center my-36">جارٍ التحقق من تسجيل الدخول...</p>;

    if (!isLoggedIn && !isAdmin) return null; // سيتم إعادة توجيه المستخدم تلقائيًا إلى صفحة تسجيل الدخول


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    // 🟢 جلب الحجوزات

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setIsBooked(false);
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // إرسال ملفات تعريف الارتباط مع الطلب
                credentials: "include",
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                setError("حدث خطأ أثناء إرسال البيانات!");  // إضافة  لتجنب حدوث خطأ إذا كانت result.error غير موجودة
            }
            if (response.status === 409) {
                setError("لديك بالفعل حجز في هذا الموعد");
                toast({
                    variant: "destructive",
                    title: "خطأ!",
                    description: "لديك بالفعل حجز في هذا الموعد",
                });
                return;
            }
            if (response.status === 410) {
                return;
            }
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
            toast({
                title: "تم الحجز بنجاح",
                description: "سيتم التواصل معك قريبًا.",
            });
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "خطأ!",
                description: " حدثت مشكلة أثناء إرسال،الطلب تعذر الاتصال بالسيرفر حاول مرة أخرى..",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-gray-100 p-10 min-h-screen flex items-center justify-center">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-right">حجز موعد</h2>

                {errorCheckLoginStatus && <p className="text-red-500 text-xl font-bold text-center my-7">{errorCheckLoginStatus}</p>}

                <form onSubmit={handleSubmit} className="text-right">
                    <div className="mb-4">
                        <label htmlFor="name" className="pb-2 block text-gray-700">الاسم</label>
                        <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" placeholder="أدخل اسمك" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="pb-2 block text-gray-700">البريد الإلكتروني</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contact" className="pb-2 block text-gray-700">رقم التواصل</label>
                        <input type="tel" id="contact" value={formData.contact} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="date" className="pb-2 block text-gray-700">تاريخ الوصول</label>
                        <input type="date" id="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="time" className="pb-2 block text-gray-700">وقت الوصول</label>
                        <input type="time" id="time" value={formData.time} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" />
                    </div><div className="mb-4">
                        <label htmlFor="address" className="pb-2 block text-gray-700">العنوان</label>
                        <input type="text" id="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="speciality" className="pb-2 block text-gray-700">التخصص</label>
                        <select id="speciality" value={formData.speciality} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" >
                            <option value="">اختر التخصص</option>
                            <option value="dentistry">طب أسنان</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="doctor" className="pb-2 block text-gray-700">الطبيب</label>
                        <select id="doctor" value={formData.doctor} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-right" >
                            <option value="">اختر الطبيب</option>
                            {doctors.map((doctor, index) => (
                                <option key={index} value={`${doctor.name}`}>{doctor.name}.</option>
                            ))}
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