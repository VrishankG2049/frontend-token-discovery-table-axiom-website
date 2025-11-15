"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl border border-slate-900/80 bg-slate-950/70 px-3 py-2.5"
        >
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton className="h-3 w-32 rounded-full" />
            <Skeleton className="h-2.5 w-24 rounded-full" />
          </div>
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton className="hidden h-3 w-16 rounded-full sm:block" />
          <Skeleton className="hidden h-3 w-16 rounded-full md:block" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}
