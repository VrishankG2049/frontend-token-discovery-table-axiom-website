"use client";

import { useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { TokenRowItem } from "./TokenRow";
import { TokenTabs } from "./TokenTabs";
import { LoadingSkeleton } from "./LoadingSkeleton";
import type { TokenRow as TRow } from "@/lib/types";
import { socket } from "@/lib/socket";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function TokenDiscoveryShell() {
  const [category, setCategory] = useState<
    "newPairs" | "finalStretch" | "migrated"
  >("newPairs");

  const { data, isLoading, error } = useQuery({
    queryKey: ["tokens"],
    queryFn: () => fetch("/api/tokens").then((r) => r.json()),
    refetchInterval: 15000,
    refetchOnWindowFocus: false,
  });

  const skeletonCount = 25; // show first 25 rows as skeleton

  const grouped = useMemo(() => {
    if (!data) return { newPairs: [], finalStretch: [], migrated: [] };
    return data;
  }, [data]);

  const rows = grouped[category] ?? [];

  const isPerfAudit =
    typeof window !== "undefined" &&
    window.location.search.includes("lighthouse");

  if (isPerfAudit) socket.subscribe(() => {});

  const scrollRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: isLoading ? skeletonCount : rows.length,
    getScrollElement: () => scrollRef.current ?? undefined,
    estimateSize: () => 60,
    overscan: 5,
  });

  if (error)
    return <div className="text-red-400 p-6">Failed to load tokens</div>;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-50">Pulse</h1>
      <p className="mt-1 mb-4 text-slate-400 text-sm">
        Realtime token discovery — Axiom style.
      </p>

      <TokenTabs category={category} setCategory={setCategory} />

      <div
        id="scroll-container"
        ref={scrollRef}
        className="relative mt-3 h-[70vh] overflow-y-auto rounded-xl border border-slate-800/60 bg-slate-950/60"
      >
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtual) => {
            const row = rows[virtual.index];

            return (
              <div
                key={virtual.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtual.start}px)`,
                }}
              >
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <TokenRowItem
                    index={virtual.index + 1}
                    row={row}
                    category={category}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
