'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
const AddDoctor = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(
        {
            name: '', email: '', speciality: '', address: '', phone: '', cv: null as File | null,
        }
    );
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData((prev) => ({
                ...prev, cv: e.target.files![0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            for (const key in formData) {
                const value = formData[key as keyof typeof formData];
                if (value) data.append(key, value);
            }
            const res = await fetch('http://localhost:5000/api/add-doctors', {
                method: 'POST',
                body: data,
                credentials: 'include',
            });
            if (!res.ok) {
                toast({
                    variant: "destructive",
                    title: "خطأ!",
                    description: 'حدث خطأ أثناء الإضافة',
                });
            }

            toast({
                title: "نجاح",
                description: "تم إضافة الطبيب بنجاح!.",
                className: "bg-green-600 text-white border-0",
            });
            router.push('/dashboard/doctor');
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "خطأ!",
                description: " حدثت مشكلة أثناء إرسال،الطلب تعذر الاتصال بالسيرفر حاول مرة أخرى..",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">إضافة طبيب جديد</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">الاسم</Label>
                    <Input id="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="speciality">التخصص</Label>
                    <Input id="speciality" value={formData.speciality} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="address">العنوان</Label>
                    <Textarea id="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="cv">تحميل السيرة الذاتية</Label>
                    <Input id="cv" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'جاري الإضافة...' : 'إضافة الطبيب'}
                </Button>
            </form>
        </div>
    );
};

export default AddDoctor;