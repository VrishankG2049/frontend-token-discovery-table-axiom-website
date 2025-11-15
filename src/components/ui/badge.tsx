"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
          variant === "default" && "bg-slate-800 text-slate-100",
          variant === "outline" &&
            "border border-slate-700 bg-slate-900/80 text-slate-300",
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
