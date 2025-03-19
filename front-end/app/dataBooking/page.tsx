"use client";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

const API_URL = "http://localhost:5000/api/get-bookings";

const BookingData: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isLoading, isLoggedIn, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAdmin && !isLoggedIn) return;
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
        });
        console.log("status : ", response.status)
        if (!response.ok) {
          setError("فشل في تحميل الحجوزات");
        }
        const data = await response.json();
        setBookings(data);
      } catch (err: any) {
        setError("حدث خطأ أثناء جلب البيانات ، تعذر الاتصال بالسيرفر حاول مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isLoading, isLoggedIn, isAdmin]);


  const handleCardClick = (data: Booking) => {
    setSelectedBooking(data);
  };

  const handleDelete = async () => {
    if (!selectedBooking) return;
    try {
      const response = await fetch(`${API_URL}/${selectedBooking.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      setBookings(data);
      if (response.status === 403) {
        alert("ليس لديك صلاحية لحذف هذا الحجز");
        return;
      }
      if (response.status === 401) {
        router.push("/login");
      }

      if (!response.ok) {
        setError("فشل في حذف الحجز");
      } else {
        setLoading(true);
        setLoading(false);
      }
      // تجديث القائمة بعد الحذف 
      const updateBooking = bookings.filter(b => b.id !== selectedBooking.id);
      setBookings(updateBooking);
      setSelectedBooking(null);
    } catch (err: any) {
      setError("حدث خطأ أثناء جلب البيانات،تعذر الاتصال بالسيرفر حاول مرة أخرى.");
    }
  };


  return (
    <>
      {isLoading ? (
        <p className="flex items-center justify-center my-36">جارٍ التحقق من تسجيل الدخول...</p>
      ): (
      <div className="container mx-auto p-6">
        <h1 className="flex justify-center text-4xl font-bold my-10 text-right">عرض الحجوزات</h1 >

        {loading && <p className="text-gray-700 text-center">جاري تحميل الحجوزات...</p>
        }
        {error && <p className="text-red-500 text-center">{error}</p>}

        {
          !loading && !error && bookings.length > 0 ? (
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
                  {/* زر حذف مع تأكيد */}
                  <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedBooking(null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="mt-2"
                        onClick={() => setSelectedBooking(data)}
                      >
                        حذف الحجز
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-md">
                      <DialogTitle className="text-red-600">تأكيد الحذف</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        هل أنت متأكد أنك تريد حذف الحجز للمريض <strong>{selectedBooking?.name}</strong>؟
                        <br />
                        <span className="text-sm text-red-500">⚠️ لا يمكن التراجع عن هذا الإجراء بعد التنفيذ.</span>
                      </DialogDescription>

                      <div className="flex justify-end space-x-2 mt-4">
                        <DialogClose asChild>
                          <Button variant="outline">إلغاء</Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          onClick={handleDelete}
                          disabled={loading}
                        >
                          {loading ? "جاري الحذف..." : "تأكيد الحذف"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p className="text-gray-700 text-center">لا توجد حجوزات متاحة</p>
          )
        }

        {
          selectedBooking && (
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
          )
        }

        <div className="flex items-center justify-center mt-8 me-8">
          <Button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            تحديث القائمة
          </Button>
        </div>
      </div >
      )
      }
    </>
  );
};

export default BookingData;
<p className="flex items-center justify-center my-36">جارٍ التحقق من تسجيل الدخول...</p>;