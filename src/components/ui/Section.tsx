import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "header" | "footer";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Component = "section", ...props }, ref) => {
    return (
      <Component
        ref={ref as React.ForwardedRef<HTMLDivElement>} // Safe assertion for forwardRef types
        className={cn("py-24 relative overflow-hidden", className)}
        {...props}
      />
    );
  }
);

Section.displayName = "Section";
