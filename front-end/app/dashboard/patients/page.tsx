"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import { useRouter } from "next/navigation";

interface AccountPatient {
    id: string;
    email: string;
}

const PatientsTable = () => {
    const [accountPatients, setAccountPatients] = useState<AccountPatient[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedAccountPatient, setSelectedAccountPatient] = useState<AccountPatient | null>(null);
    const [loading, setLoading] = useState(false);
    const { isLoading, isAdmin } = useAuthAdmin();
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin && !isLoading) return;

        const getPatients = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/get-patients", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.status === 401) {
                    setError("غير مصرح به، أنت لست مديرًا");
                    router.push("/admin");
                    return;
                }

                const data = await response.json();
                if (response.ok) {
                    setAccountPatients(data);
                }
            } catch (err) {
                setError("حدث خطأ أثناء جلب البيانات");
            }
        };

        getPatients();
    }, [isLoading, isAdmin]);

    const handleDelete = async () => {
        if (!selectedAccountPatient) return;

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/delete-patient/${selectedAccountPatient.id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (res.ok) {
                setAccountPatients((prev) => prev.filter((account) => account.id !== selectedAccountPatient.id));
            }
        } catch (err) {
            setError("حدث خطأ أثناء حذف الحساب");
        } finally {
            setLoading(false);
            setSelectedAccountPatient(null);
        }
    };

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                <h2 className="text-lg font-semibold mb-4 text-center md:text-start">Patient Accounts</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-sky-800">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Email Patient</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountPatients.map((accountPatient, index) => (
                            <tr key={accountPatient.id} className="text-center hover:bg-gray-100 transition-all">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-4 border text-start">
                                    <p className="font-semibold text-darkColor/90 text-lg">{accountPatient.email}</p>
                                </td>
                                <td className="p-2 border">
                                    <div className="flex justify-center space-x-2">
                                        <Link href="">
                                            <Edit className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                                        </Link>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button onClick={() => setSelectedAccountPatient(accountPatient)}>
                                                    <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                                                </button>
                                            </DialogTrigger>

                                            {selectedAccountPatient && (
                                                <DialogContent className="max-w-md">
                                                    <DialogTitle className="text-red-600">تأكيد الحذف</DialogTitle>
                                                    <DialogDescription className="text-gray-600">
                                                        هل أنت متأكد أنك تريد حذف حساب المريض هذا؟
                                                        <br />
                                                        <span className="text-sm text-red-500">⚠️ لا يمكن التراجع عن هذا الإجراء بعد التنفيذ.</span>
                                                    </DialogDescription>

                                                    <div className="flex justify-end space-x-2 mt-4">
                                                        <DialogClose asChild>
                                                            <Button variant="outline">إلغاء</Button>
                                                        </DialogClose>
                                                        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
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
};
export default PatientsTable;