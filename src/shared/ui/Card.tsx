import React, { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "primary";
}

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "bg-white border border-surfaceVariant",
  glass: "bg-white/70 backdrop-blur-xl border border-white/20",
  primary: "bg-primary text-onPrimary",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
