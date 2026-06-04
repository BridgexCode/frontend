import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "shine";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95",
          // Size variants
          {
            "px-4 py-2 text-sm rounded-lg": size === "sm",
            "px-6 py-2.5 text-base rounded-full": size === "md" && variant === "secondary", // Matches standard pill
            "px-8 py-4 text-base rounded-xl": size === "lg" || (size === "md" && variant !== "secondary"), // Matches primary rectangular styling
            "px-6 py-2.5 text-base rounded-xl": size === "md" && variant !== "secondary",
          },
          // Variant styling
          {
            "bg-primary text-on-primary hover:bg-neutral-800 shadow-lg shadow-primary/10 hover:scale-[1.02]": variant === "primary",
            "bg-secondary text-on-secondary hover:bg-emerald-800 shadow-lg shadow-secondary/15 hover:scale-[1.02]": variant === "secondary",
            "border border-outline-variant/30 bg-transparent text-on-surface hover:bg-surface-container transition-all": variant === "outline",
            "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low": variant === "ghost",
          },
          // Shine effect (Matches original .btn-shine)
          variant === "shine" && 
            "relative overflow-hidden bg-primary text-on-primary hover:scale-[1.02] shadow-lg shadow-primary/10 group/shine",
          className
        )}
        {...props}
      >
        {children}
        {variant === "shine" && (
          <span 
            className="absolute top-[-50%] left-[-150%] w-full h-[200%] bg-linear-to-r from-transparent via-white/30 to-transparent rotate-[25deg] pointer-events-none transition-all duration-700 ease-in-out group-hover/shine:left-[150%]"
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
