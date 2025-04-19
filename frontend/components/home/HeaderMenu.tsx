"use client"
import Link from "next/link"
import { links } from "@/constants/index"
import { usePathname } from "next/navigation"
const HeaderMenu = () => {
    const pathname = usePathname()
    return (
        <div className={`hidden items-center md:flex md:flex-row-reverse  md:gap-3 md:text-base text-lg xl:gap-10 xl:text-xl lg:gap-6 lg:text-lg font-semibold`}>
            {links.map(link =>
                <Link className={`hover:text-darkColor text-center hoverEffect relative group ${pathname === link?.url && "text-darkColor"}`} key={link.id} href={link.url}>
                    {link?.title}
                    <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5
                                    bg-black hoverEffect group-hover:w-1/2 group-hover:left-0
                                    ${pathname === link?.url && "w-1/2"}`}></span>

                    <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5
                                    bg-black hoverEffect group-hover:w-1/2 group-hover:right-0
                                    ${pathname === link?.url && "w-1/2"}`}></span>
                </Link>
            )}
        </div>
    )
}

export default HeaderMenu
