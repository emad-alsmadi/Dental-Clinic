"use client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
interface Doctor {
    id: number;
    name: string;
    email: string;
    specialty: string;
    address: string;
    phone: string;
    image_url?: string;
    cv_url?: string;
}
const API_URL = "http://localhost:5000/api/get-doctors";

const DoctorManagement = () => {
    const { toast } = useToast();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            setDoctors(data);
        }
        catch (err) {
            toast({
                variant: "destructive",
                title: "خطأ!",
                description: " حدثت مشكلة أثناء إرسال،الطلب تعذر الاتصال بالسيرفر حاول مرة أخرى..",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (data: Doctor) => {
        setSelectedDoctor(data);
    };
    const handleDelete = async () => {
        if (!selectedDoctor) return;
        try {
            const response = await fetch(`${API_URL}/${selectedDoctor.id}`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await response.json();
            setDoctors(data);
            if (response.status === 403) {
                toast({
                    variant: "destructive",
                    title: "خطأ!",
                    description: "ليس لديك صلاحية لحذف هذا الحجز",
                });
                return;
            }
            if (response.status === 401) {
                toast({
                    variant: "destructive",
                    title: "خطأ!",
                    description: "انت لست مدير",
                });
                router.push("/admin");
            }
            setLoading(true);
            setLoading(false);
            // تجديث القائمة بعد الحذف 
            const updateBooking = doctors.filter(d => d.id !== selectedDoctor.id);
            setDoctors(data);
            setSelectedDoctor(null);
        } catch (err) {
            toast({
                variant: "destructive",
                title: "خطأ!",
                description: " حدثت مشكلة أثناء إرسال،الطلب تعذر الاتصال بالسيرفر حاول مرة أخرى..",
            });
        }
    };
    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-900">Doctor Management</h1>
                <Button onClick={() => router.push("doctor/add-doctor")}>+ Add Doctor</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <Card key={doctor.id} onClick={() => handleCardClick(doctor)} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <CardContent className="p-5 space-y-3">
                            <div className="text-right">
                                <h2 className="text-xl font-bold text-blue-900">{doctor.name}</h2>
                                <p className="text-gray-700">Email: {doctor.email}</p>
                                <p className="text-gray-700">Phone: {doctor.phone}</p>
                                <p className="text-gray-700">Specialty: {doctor.specialty}</p>
                                <p className="text-gray-700">Address: {doctor.address}</p>
                                {doctor.cv_url && (
                                    <a
                                        href={doctor.cv_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline text-sm"
                                    >
                                        View CV
                                    </a>
                                )}
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button onClick={() => router.push(`/dashboard/edit - doctor / ${doctor.id}`)}>Edit</Button>
                                {/* زر حذف مع تأكيد */}
                                <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedDoctor(null)}>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            className="mt-2"
                                            onClick={() => setSelectedDoctor(doctor)}
                                        >
                                            حذف الحجز
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="max-w-md">
                                        <DialogTitle className="text-red-600">تأكيد الحذف</DialogTitle>
                                        <DialogDescription className="text-gray-600">
                                            <strong>{selectedDoctor?.name}</strong>هل أنت متأكد أنك تريد حذف  الطبيب من النظام ؟
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
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    );
};

export default DoctorManagement;