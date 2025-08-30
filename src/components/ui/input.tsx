import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-white/30 bg-white/10 backdrop-blur-lg px-4 py-2 text-base shadow-lg text-blue-900 placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
          className
        )}
        ref={ref}
        aria-label={props["aria-label"] || "Input field"}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
