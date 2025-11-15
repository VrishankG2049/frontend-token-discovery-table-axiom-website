"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  size?: "sm" | "md";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
          size === "sm" && "h-7 px-3",
          size === "md" && "h-8 px-4 text-sm",
          variant === "solid" &&
            "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
          variant === "outline" &&
            "border border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
