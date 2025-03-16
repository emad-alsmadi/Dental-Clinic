"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import PatientsTable from "@/components/ui/PatientsTable";
import AppointmentsTable from "@/components/ui/AppointmentsTable";

const Dashboard = () => {
    const { isLoading, isAdmin } = useAuthAdmin();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"appointments" | "patients">();

    // جلب البيانات من API Flask
    useEffect(() => {
        if (!isAdmin && !isLoading) return;
    }, [isLoading, isAdmin, router]);

    return (
        <>
            {!isAdmin ? (
                <p className="flex items-kfcenter justify-center my-36">جارٍ التحقق من تسجيل الدخول...</p>
            ) : (
                <div className="flex font-sans">
                    {/* الشريط الجانبي */}
                    <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen">
                        <h2 className="text-2xl font-bold mb-10 mt-2 cursor-pointer" onClick={() => setActiveTab(undefined)}>Admin Dashboard</h2>
                        <ul className="space-y-12">
                            <li className="hover:text-gray-300  cursor-pointer" onClick={() => setActiveTab("appointments")}>
                                Appointments Dashboard
                            </li>
                            <li className="hover:text-gray-300  cursor-pointer">
                                <Link href="/dataBooking">View Booking</Link>
                            </li>
                            <li className="hover:text-gray-300  cursor-pointer" onClick={() => setActiveTab("patients")}>
                                Patients Dashboard
                            </li>
                            <li className="hover:text-gray-300  cursor-pointer">Settings</li>
                        </ul>
                    </aside>

                    {/* المحتوى الرئيسي */}
                    <main className="flex-1 p-6 bg-gray-100">
                        {/* الشريط العلوي */}
                        <header className="flex justify-between items-center bg-white p-4 shadow-md mb-6 rounded-lg">
                                <h1 className="text-xl font-semibold">{activeTab || "Admin Dashboard"}</h1>
                            <div className="flex items-center space-x-4">
                                <Bell className="w-6 h-6 text-gray-600" />
                                <Calendar className="w-6 h-6 text-gray-600" />
                            </div>
                        </header>

                        {/* بطاقات الإحصائيات */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Stable {activeTab || ""}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-3xl font-bold">22</CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Good {activeTab || ""}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-3xl font-bold">12</CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Critical {activeTab || ""}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-3xl font-bold">2</CardContent>
                            </Card>
                        </div>
                        {/* المخططات */}
                            
                        {/* جدول المواعيد */}
                        {
                            activeTab === "appointments" ?
                                <AppointmentsTable />
                                : activeTab === "patients" ?
                                    <PatientsTable />
                                    : <></>
                        }
                    </main >
                </div >
            )}
        </>
    );
}
export default Dashboard;