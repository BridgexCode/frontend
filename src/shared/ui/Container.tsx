import React from "react";
import { cn } from "@/shared/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "main";
}

export function Container({ as: Tag = "div", className, children, ...props }: ContainerProps) {
  return (
    <Tag className={cn("max-w-7xl mx-auto px-6 md:px-10", className)} {...props}>
      {children}
    </Tag>
  );
}
