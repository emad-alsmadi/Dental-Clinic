"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
    status: "Pending" | "Confirmed" | "Rejected";
}

const AppointmentsTable = () => {
    const { toast } = useToast();
    const [appointments, setAppointments] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(false);
    const { isLoading, isAdmin } = useAuthAdmin();
    const [error, setError] = useState<string | null>("")
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin && !isLoading) return;

        const fetchBookings = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5000/api/get-bookings", {
                    method: "GET",
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setAppointments(data);
                }
            } catch (err) {
                toast({
                    variant: "destructive",
                    title: "خطأ!",
                    description: " حدثت مشكلة أثناء إرسال،الطلب تعذر الاتصال بالسيرفر حاول مرة أخرى..",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [isLoading, isAdmin, router]);

    const handleDelete = async () => {
        if (!selectedBooking) return;

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/get-bookings/${selectedBooking.id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (res.ok) {
                setAppointments((prev) => prev.filter((a) => a.id !== selectedBooking.id));
            }
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "خطأ!",
                description: " حدثت مشكلة أثناء إرسال،الطلب  حاول مرة أخرى..",
            });
        } finally {
            setLoading(false);
            setSelectedBooking(null);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Patient Appointments</h2>
            {loading ? (
                <p className="text-center text-gray-500">... جاري التحميل</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
                    <thead>
                        <tr className="bg-blue-100 text-gray-800">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Schedule</th>
                            <th className="p-2 border lg:table-cell hidden">Patient</th>
                            <th className="p-2 border">Contact</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment.id} className="text-center text-gray-700 hover:bg-gray-50 transition">
                                <td className="p-2 border">{index}</td>
                                <td className="p-2 border">
                                    <p className="font-semibold text-lg">{appointment.time}</p>
                                    <p className="text-gray-500 text-sm">{appointment.date}</p>
                                </td>
                                <td className="p-2 border lg:table-cell hidden text-start">
                                    <p className="font-semibold text-lg">{appointment.name}</p>
                                    <p className="text-gray-500 text-sm">{appointment.address}</p>
                                </td>
                                <td className="p-2 border text-start">
                                    <p className="font-semibold text-lg">{appointment.email}</p>
                                </td>
                                <td className="p-2 border">
                                    <span
                                        className={`px-2 py-1 text-white rounded text-sm ${appointment.status === "Rejected"
                                            ? "bg-red-500"
                                            : appointment.status === "Pending"
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                            }`}
                                    >
                                        {appointment.status}
                                    </span>
                                </td>
                                <td className="p-2 border">
                                    <div className="flex justify-center space-x-3">
                                        <Link href="#" className="text-blue-500 hover:text-blue-700">
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button onClick={() => setSelectedBooking(appointment)}>
                                                    <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                                                </button>
                                            </DialogTrigger>

                                            {selectedBooking && (
                                                <DialogContent className="max-w-md">
                                                    <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
                                                    <DialogDescription className="text-gray-600">
                                                        Are you sure you want to delete <strong>{selectedBooking.name}</strong>'s appointment?
                                                        <br />
                                                        <span className="text-sm text-red-500">⚠️ This action cannot be undone.</span>
                                                    </DialogDescription>

                                                    <div className="flex justify-end space-x-2 mt-4">
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogClose>
                                                        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                                                            {loading ? "Deleting..." : "Confirm Delete"}
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
            )}
        </div>
    );
};
export default AppointmentsTable;