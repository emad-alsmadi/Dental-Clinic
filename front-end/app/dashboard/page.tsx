"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Bell, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import useAuthAdmin from "@/hooks/useAuthAdmin";
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
const API_BOOKINGS_URL = "http://localhost:5000/api/get-bookings";

const Dashboard = () => {
    const [appointments, setAppointments] = useState<Booking[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState("");
    const [errorDelete, setErrorDelete] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorCheckLoginAdminStatus, setErrorCheckLoginAdminStatus] = useState("");
    const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false); // حالة تسجيل الدخول
    const { isLoading, isAdmin } = useAuthAdmin();
    const router = useRouter();


    if (isLoading) return <p className="flex items-kfcenter justify-center my-36">جارٍ التحقق من تسجيل الدخول...</p>;

    if (!isAdmin) return null; // سيتم إعادة توجيه المستخدم تلقائيًا إلى صفحة تسجيل الدخول

   
    // حذف موعد من API Flask
    const handleDelete = async (id: string) => {
        const res = await fetch(`"http://localhost:5000/api/get-bookings"/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        console.log("the res of dashboard : ", res);
        if (res.ok) {
            console.log("the respons is ok")
            setAppointments(prevAppointements =>
                prevAppointements.filter((appointment) => appointment.id !== id)
            );
        } else {
            console.log("the respons is field");
        }
        // else {
        //     setErrorDelete("فشل في تحميل الحجز")
        // }
    }
    // جلب البيانات من API Flask
    useEffect(() => {
        setError("");

        const fetchBookings = async () => {
            try {
                const res = await fetch(API_BOOKINGS_URL, {
                    method: "GET",
                    credentials: "include",
                })
                if (!res.ok) {
                    setError("فشل في  تسجيل دخول الأدمن");
                }
                const data = await res.json();
                setAppointments(data);
                console.log("The bookings : => ", data)
                setBookings(data);
            } catch (err: any) {
                setError("حدث خطأ أثناء الاتصال بسيرفر ، حاول مرة أخرى.");
            }
        }
        fetchBookings();
    }, []);
    return (
        <div className="flex font-sans">
            {/* الشريط الجانبي */}
            <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen">
                <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
                <ul className="space-y-4">
                    <li className="hover:text-gray-300">Dashboard</li>
                    <li className="hover:text-gray-300">Appointments</li>
                    <li className="hover:text-gray-300">Patients</li>
                    <li className="hover:text-gray-300">Settings</li>
                </ul>
            </aside>

            {/* المحتوى الرئيسي */}
            <main className="flex-1 p-6 bg-gray-100">
                {/* الشريط العلوي */}
                <header className="flex justify-between items-center bg-white p-4 shadow-md mb-6 rounded-lg">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <Bell className="w-6 h-6 text-gray-600" />
                        <Calendar className="w-6 h-6 text-gray-600" />
                    </div>
                </header>

                {/* بطاقات الإحصائيات */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stable Patients</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">22</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Good Patients</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">12</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Critical Patients</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">2</CardContent>
                    </Card>
                </div>

                {/* جدول المواعيد */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Patient Appointments</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-sky-800">
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">Schedule</th>
                                <th className="p-2 border">Patient</th>
                                <th className="p-2 border">Contact info</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id} className="text-center">
                                    <td className="p-2 border">{appointment.id}ID</td>
                                    <td className="p-2 border flex flex-col items-start">
                                        <p className=" font-semibold text-lg">{appointment.time}</p>
                                        <p className="text-darkColor/55 text-sm">{appointment.date}</p>
                                    </td>
                                    <td className="p-4 border text-start">
                                        <p className=" font-semibold text-darkColor/90 text-lg">{appointment.name}</p>
                                        <p className="text-darkColor/55 text-sm">{appointment.address}</p>
                                    </td>
                                    <td className="p-4 border text-start">
                                        <p className=" font-semibold text-darkColor/90 text-lg">{appointment.email}</p>
                                        <p className="text-darkColor/55 text-sm">{appointment.address}</p>
                                    </td>
                                    <td className="p-2 border">
                                        <span
                                            className={`px-2 py-1 text-white rounded ${appointment.id === "Rejected" ? "bg-red-500" : appointment.id === "Pending" ? "bg-yellow-500" : "bg-blue-500"}`}>
                                            {appointment.id}
                                        </span>
                                    </td>
                                    <td className="p-2 border">
                                        <div className="flex justify-center space-x-2">
                                            <Link href="">
                                                <Edit className="w-5 h-5 text-blue-500" />
                                            </Link>
                                            <Link href="" onClick={() => handleDelete(appointment.id)}>
                                                <Trash2 className="w-5 h-5 text-red-500" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main >
        </div >
    );
}
export default Dashboard;