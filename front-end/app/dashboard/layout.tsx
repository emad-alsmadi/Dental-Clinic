"use client";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Navbar from "@/app/components/dashboard/Navbar";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ تحكم في حالة الـ Sidebar

    const pathname = usePathname();
    let title = "Dashboard";
    if (pathname.includes("patients")) title = "Dashboard Account Patients";
    if (pathname.includes("appointments")) title = "Dashboard Appointments";
    return (
        <div className="flex">
            {/* ✅ زر فتح القائمة يظهر فقط في الشاشات الصغيرة */}

            {/* ✅ تمرير حالة الفتح لـ Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* ✅ المحتوى الرئيسي */}
            <div className="flex-1">
                <Navbar title={title}>
                    <button className="md:hidden p-4 text-gray-600"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </Navbar>
                <div className="p-4 overflow-x-auto">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;