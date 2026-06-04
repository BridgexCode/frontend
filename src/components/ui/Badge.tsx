import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "error" | "outline";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors",
          {
            "bg-primary/10 text-primary border border-primary/20": variant === "default",
            "bg-secondary-container/30 text-secondary border border-secondary/20": variant === "secondary",
            "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400": variant === "success",
            "bg-error-container text-on-error-container border border-error/10": variant === "error",
            "border border-outline-variant/30 text-on-surface-variant": variant === "outline",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
