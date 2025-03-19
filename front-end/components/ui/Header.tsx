"use client"
import Link from 'next/link';
import Image from 'next/image'
import Container from "./Container"
import HeaderMenu from "./HeaderMenu"
import LogoutButton from '../LogoutButton';
import MobileMenu from "./MobileMenu"
import SearchBar from "./SearchBar"
import srcImage from "@/public/images/logo_D.png"
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";


const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const pathname = usePathname(); // ملعرفة الصفحة الحالية
    // تجديث حالة تسجيل الدخول عند تحميل الصفحة 
    useEffect(() => {
        const isLoggedInStatus = localStorage.getItem("isLoggedIn") === "true";
        const isAdminStatus = localStorage.getItem("isAdmin") === "true";
        setIsLoggedIn(isLoggedInStatus);
        setIsAdmin(isAdminStatus)
    }, [])
    // تحديث isLoggined  عند تغيير الصفحة 
    useEffect(() => {
        const isLoggedInStatus = localStorage.getItem("isLoggedIn") === "true";
        const isAdminStatus = localStorage.getItem("isAdmin") === "true";
        setIsLoggedIn(isLoggedInStatus);
        setIsAdmin(isAdminStatus);
    }, [pathname])


    return (
        <>
            <div className={`bg-white border-b border-b-gray-400 pb-5`}>
                <div className='px-11 pb-2 h-16 bg-blue-400 w-auto flex items-center justify-between gap-5'>
                    <SearchBar />
                    {
                        !isLoggedIn ? (
                            <Link href="/auth/login" className='p-3 text-base font-sans font-semibold'>تسجيل الدخول</Link>
                        ) : <></>
                    }
                    {
                        isAdmin ? (
                            <Link href="/dashboard" className='p-3 text-base font-sans font-semibold'> ادارة الحجوزات</Link>
                        ): <></>
                    }
                    <p className='text-base font-sans font-normal text-darkColor/80 flex-1'>24/7 أطباء متوفرون لمساعدتك</p>

                    <h1 className='text-base font-sans font-normal text-darkColor/90'>طبيبك صديقك راجع الطبيب الآن ...  <span className='text-black font-semibold'>عيادتنا معك أينما كنت</span> </h1>
                </div>
                <Container className="flex items-center justify-between gap-7 text-lightColor">
                    <div className="w-auto flex items-center justify-end gap-5">
                        {!isLoggedIn ? (
                            <>
                                <Link href="/auth/sign-up" className="bg-blue-400 py-3 px-5 rounded-md text-white text-sm font-semibold hover:text-white/70">اشتراك</Link>
                                <Link href="/auth/login" className="bg-emerald-500 py-3 px-5 rounded-md text-white text-sm font-semibold hover:text-white/70">تسجيل الدخول</Link>
                            </>
                        ) : (
                            <LogoutButton />
                        )
                        }
                    </div>
                    <div className=" w-auto md:w-1/2 flex flex-1 text-center items-center justify-end  gap-2.5">
                        <HeaderMenu />
                    </div>
                    <div className='flex justify-end items-center ms-4'>
                        <h1 className='text-blue-400 font-bold text-2xl text-end'>الطبي <br /> ODental</h1>
                        <Image width={90} height={50} src={srcImage} alt="logo" />
                    </div>
                    <MobileMenu />
                </Container>
            </div>
        </>
    )
};
export default Header;



