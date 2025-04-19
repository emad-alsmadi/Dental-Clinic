"use client"
import Link from 'next/link';
import Image from 'next/image'
import Container from './Container';
import LogoutButton from '../auth/LogoutButton';
import HeaderMenu from '../home/HeaderMenu';
import MobileMenu from '../home/MobileMenu';
import SearchBar from "./SearchBar";
import srcImage from "@/public/images/logo_D.png";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        setIsLoggIn(window.localStorage.getItem("isLoggIn") == "true");
        setIsAdmin(window.localStorage.getItem("isAdmin") == "true");
    }, [])
    useEffect(() => {
        setIsLoggIn(window.localStorage.getItem("isLoggIn") == "true");
        setIsAdmin(window.localStorage.getItem("isAdmin") == "true");
    }, [pathname])
    return (
        <>
            <div className="bg-white border-b border-b-gray-400 pb-2">
                <div className="px-4 md:px-11 p-2 h-auto md:h-18 bg-blue-400 flex flex-wrap items-center justify-between gap-5">
                    <SearchBar />
                    {
                        !isLoggedIn && (
                            <Link href="/auth/login" className="p-3 text-base font-sans font-semibold hidden md:block">
                                تسجيل الدخول
                            </Link>
                        )
                    }
                    {
                        isAdmin && (
                            <Link href="/dashboard" className="p-3 text-base font-sans font-semibold hidden md:block">
                                إدارة الحجوزات
                            </Link>
                        )
                    }
                    <p className="text-base font-sans font-normal text-darkColor/80 flex-1 text-center md:text-start">
                        24/7 أطباء متوفرون لمساعدتك
                    </p>

                    <h1 className="text-base font-sans font-normal text-darkColor/90 text-center md:text-start">
                        طبيبك صديقك راجع الطبيب الآن ... <span className="text-black font-semibold">عيادتنا معك أينما كنت</span>
                    </h1>
                </div>
                {/* القائمة الرئيسية */}
                < Container className="flex flex-wrap items-center justify-between gap-5 text-lightColor" >
                    <div className="w-auto flex items-center justify-end md:gap-2 lg:gap-5">
                        {!isLoggedIn && !isAdmin ? (
                            <>
                                <Link href="/auth/sign-up" className="bg-blue-700 py-3 px-5 rounded-md text-white text-sm font-semibold hover:text-white/70 hidden md:block">
                                    اشتراك
                                </Link>
                                <Link href="/auth/login" className="bg-emerald-800 py-3 px-5 rounded-md text-white text-sm font-semibold hover:text-white/70 hidden md:block">
                                    تسجيل الدخول
                                </Link>
                            </>
                        ) : (
                            <LogoutButton />
                        )}
                    </div>
                    {/* قائمة التنقل الرئيسية */}
                    <div className="w-full md:w-auto flex flex-1 justify-center md:justify-end lg:gap-2.5">
                        <HeaderMenu />
                    </div>
                    <div className="flex justify-center md:justify-end items-center ms-2 lg:ms-4">
                        <h1 className="text-blue-400 font-bold text-xl lg:text-2xl text-center md:text-end">
                            الطبي <br /> ODental
                        </h1>
                        <Image width={90} height={50} src={srcImage} alt="logo" />
                    </div>
                    {/* القائمة الجانبية للجوال */}
                    <div className="block md:hidden">
                        <MobileMenu />
                    </div>
                </Container >
            </div >
        </>
    )
};
export default Header;