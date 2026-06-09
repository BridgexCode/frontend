import React from "react";
import { cn } from "@/shared/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article" | "footer";
}

export function Section({ as: Tag = "section", className, children, ...props }: SectionProps) {
  return (
    <Tag className={cn("py-24", className)} {...props}>
      {children}
    </Tag>
  );
}
