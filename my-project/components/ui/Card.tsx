import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div className={cn("bg-white p-4 rounded-lg shadow-md", className)}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className }: CardProps) {
    return (
        <div className={cn("border-b pb-2 mb-2 font-semibold text-gray-700", className)}>
            {children}
        </div>
    );
}

export function CardContent({ children, className }: CardProps) {
    return <div className={cn("text-gray-900", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
    return <h3 className={cn("text-lg font-bold", className)}>{children}</h3>;
}