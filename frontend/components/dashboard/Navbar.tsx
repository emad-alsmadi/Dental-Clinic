import { Calendar, Bell } from "lucide-react";

interface NavbarProps {
    title: string;
    children?: React.ReactNode;
}
const Navbar = ({ title, children }: NavbarProps) => {
    return (
        <header className="flex flex-wrap justify-between items-center bg-white p-2 md:p-4 shadow-md m-6 rounded-lg">
            <div>
                {children}
            </div>
            <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
            <div className="flex items-center space-x-4">
                <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
                <Calendar className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
            </div>
        </header>
    )
}

export default Navbar