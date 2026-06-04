import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full max-w-7xl mx-auto px-6 md:px-10 z-10", className)}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
export default Container;
