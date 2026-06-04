import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "primary";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300",
          {
            "bg-surface-container-lowest border border-outline-variant/20 shadow-sm": variant === "default",
            "bg-white/70 backdrop-blur-xl border border-white/50 shadow-xs": variant === "glass",
            "bg-primary-container text-white shadow-2xl": variant === "primary",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
