import Link from "next/link";
import { X } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) => {
    return (
        <>
            {/* ✅ غطاء شفاف يغلق القائمة عند النقر خارجها */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-blue-400 text-black font-semibold p-4 min-h-screen transition-transform duration-300 z-50
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex-shrink-0 `}
            >
                {/* ✅ زر الإغلاق في الشاشات الصغيرة */}
                <button className="md:hidden text-white mb-4" onClick={() => setSidebarOpen(false)}>
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold mb-10 mt-2 cursor-pointer hover:text-gray-300">
                    <Link href="/dashboard">Admin Dashboard</Link>
                </h2>

                <ul className="space-y-6">
                    <li className="cursor-pointer hover:text-gray-300">
                        <Link href="/dashboard/appointments">Appointments Management</Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-300">
                        <Link href="/dashboard/patients">Patients Management</Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-300">
                        <Link href="/dashboard/doctor">Doctor Management</Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-300">
                        <Link href="/dataBooking">Booking Management</Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-300">
                        <Link href="#">Setting Management</Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;