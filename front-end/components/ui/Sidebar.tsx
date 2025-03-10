import { motion } from 'motion/react';
import { X } from 'lucide-react';
import Link from "next/link"
import { links } from "@/constants/index";
import { usePathname } from "next/navigation"
import SocialMedia from './SocialMedia';
import { useOutSidClick } from '@/hooks/useOutsideClick';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Sidebar = ({ isOpen, onClose }: Props) => {

  const pathname = usePathname()
  const sidebarRef = useOutSidClick<HTMLDivElement>(onClose);

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-darkColor/50 shadow-xl hoverEffect
    cursor-auto  w-full ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-blue-500 text-white/70
        h-full p-10 border-r border-r-white-500 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <button className='hover:text-red-500 hoverEffect' onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide">
          {links.map(link =>
            <Link className={`hover:text-white hoverEffect w-24 ${pathname === link?.url && "text-white"}`} key={link.id} href={link.url}>
              {link?.title}
            </Link>
          )}
        </div>
        <SocialMedia />
      </motion.div>
    </div>
  )
}

export default Sidebar
