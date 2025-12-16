import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20",
            secondary: "bg-slate-800 hover:bg-slate-700 text-white",
            outline: "border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white bg-transparent",
            ghost: "text-slate-400 hover:text-white hover:bg-slate-800/50",
            gradient: "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-violet-500/25 border border-transparent",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg font-semibold",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
