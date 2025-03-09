"use client";

import { faL } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const API_URL = "http://localhost:5000/api/get-bookings"; // تعديل الرابط



const BookingData = () => {
  const [flag, setFlag] = useState<boolean>(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // حالة تسجيل الدخول
  const router = useRouter();


  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include", // إرسال الجلسة مع الطلب
      });

      if (response.status === 401) {
        router.push("/Login");
        return;
      }
      if (!response.ok) {
        setError("فشل في تحميل الحجوزات");
      }

      const data = await response.json();
      console.log("The bookings : => ", data)
      setBookings(data);
    } catch (err: any) {
      setError("حدث خطأ أثناء جلب البيانات، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (data: Booking) => {
    setSelectedBooking(data);
  };

  const handleDelete = async (id: string) => {
    //setLoading(true)
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
        router.push("/Login");
      }
      if (!response.ok) {
        setError("فشل في تحميل الحجز")
      }

      const data = await response.json();
      setBookings(data);
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء جلب البيانات، حاول مرة أخرى.");
    }
  };
  useEffect(() => {
    if (flag === true) {
      console.log("fetch faild");
      fetchBookings();
    }
  }, [flag])

  return (
    <div className="container mx-auto p-6">
      <h1 className="flex justify-center text-4xl font-bold my-10 text-right">عرض الحجوزات</h1>

      {loading && <p className="text-gray-700 text-center">جاري تحميل الحجوزات...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((data) => (
            <div
              key={data.id}
              className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow text-right"
              onClick={() => handleCardClick(data)}
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{data.name}</h2>
                <p className="text-gray-700"><strong>البريد الإلكتروني:</strong> {data.email}</p>
                <p className="text-gray-700"><strong>التاريخ:</strong> {data.date}</p>
                <p className="text-gray-700"><strong>الوقت:</strong> {data.time}</p>
              </div>
              <button
                onClick={() => handleDelete(data.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-700 text-center">لا توجد حجوزات متاحة</p>
      )}

      {selectedBooking && (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6 text-right">
          <h2 className="text-xl font-bold mb-4">تفاصيل الحجز</h2>
          <p className="text-gray-700 mb-2"><strong>الاسم:</strong> {selectedBooking.name}</p>
          <p className="text-gray-700 mb-2"><strong>البريد الإلكتروني:</strong> {selectedBooking.email}</p>
          <p className="text-gray-700 mb-2"><strong>التاريخ:</strong> {selectedBooking.date}</p>
          <p className="text-gray-700 mb-2"><strong>الوقت:</strong> {selectedBooking.time}</p>
          <p className="text-gray-700 mb-2"><strong>العنوان:</strong> {selectedBooking.address}</p>
          <p className="text-gray-700 mb-2"><strong>التخصص:</strong> {selectedBooking.speciality}</p>
          <p className="text-gray-700"><strong>الطبيب:</strong> {selectedBooking.doctor}</p>
        </div>
      )}

      <div className="flex items-center justify-center mt-8 me-8">
        <button
          onClick={fetchBookings}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          تحديث القائمة
        </button>
      </div>
    </div>
  );
};

export default BookingData;
