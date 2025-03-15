"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthAdmin from "@/hooks/useAuthAdmin";
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

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const { isLoading, isAdmin } = useAuthAdmin();
  const router = useRouter();

  const [error, setError] = useState("");
  const [errorDelete, setErrorDelete] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");


  // حذف موعد من API Flask
  const handleDelete = async () => {
    if (!selectedBooking) return;

    setLoading(true);
    const res = await fetch(`http://localhost:5000/api/get-bookings/${selectedBooking.id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== selectedBooking.id)
      );
    }
    setLoading(false);
    setSelectedBooking(null);
  };

  // جلب البيانات من API Flask
  useEffect(() => {
    if (!isAdmin && !isLoading) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/get-bookings", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
        }
      } catch (err: any) {
        setError("حدث خطأ أثناء جلب البيانات");
      }
    };

    fetchBookings();
  }, [isLoading, isAdmin, router]);

  return (
    <>
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
                    {/* زر حذف مع تأكيد */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button onClick={() => setSelectedBooking(appointment)}>
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </DialogTrigger>

                      {selectedBooking && (
                        <DialogContent className="max-w-md">
                          <DialogTitle className="text-red-600">تأكيد الحذف</DialogTitle>
                          <DialogDescription className="text-gray-600">
                            هل أنت متأكد أنك تريد حذف الحجز للمريض <strong>{selectedBooking.name}</strong>؟
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
                      )}
                    </Dialog>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default AppointmentsTable;
