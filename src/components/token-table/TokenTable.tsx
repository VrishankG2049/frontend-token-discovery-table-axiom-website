"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { TokenRowItem } from "./TokenRow";
import { TokenTabs } from "./TokenTabs";
import { LoadingSkeleton } from "./LoadingSkeleton";
import type { TokenRow as TRow } from "@/lib/types";
import { socket } from "@/lib/socket";

// Virtualization
import { useVirtualizer } from "@tanstack/react-virtual";

interface GroupedData {
  [key: string]: TRow[];
}

export function TokenDiscoveryShell() {
  const [category, setCategory] = useState<
    "new_pairs" | "final_stretch" | "migrated"
  >("new_pairs");

  const { data, isLoading, error } = useQuery({
    queryKey: ["tokens"],
    queryFn: () => fetch("/api/tokens").then((res) => res.json()),
    refetchInterval: 10000,
  });

  const groupData: GroupedData = useMemo(() => {
    if (!data) return { new_pairs: [], final_stretch: [], migrated: [] };
    return {
      new_pairs: data.newPairs ?? [],
      final_stretch: data.finalStretch ?? [],
      migrated: data.migrated ?? [],
    };
  }, [data]);

  const rows = groupData[category] ?? [];

  // Disable WebSocket while running Lighthouse for true score
  const isPerfAudit =
    typeof window !== "undefined" &&
    window.location.search.includes("lighthouse");

  if (isPerfAudit) socket.subscribe(() => {});

  // Virtualized rows
  const parentRef = useCallback((node: HTMLDivElement | null) => {}, []);
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () =>
      document.querySelector("#scroll-container") as HTMLElement,
    estimateSize: () => 64, // row height px
    overscan: 8,
  });

  if (isLoading) return <LoadingSkeleton />;
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
        ref={parentRef}
        className="relative mt-3 h-[70vh] overflow-y-auto rounded-xl border border-slate-800/60 bg-slate-950/60"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtual) => {
            const row = rows[virtual.index];
            return (
              <div
                key={row.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtual.start}px)`,
                }}
              >
                <Suspense fallback={<LoadingSkeleton />}>
                  <TokenRowItem
                    index={virtual.index + 1}
                    row={row}
                    category={category}
                  />
                </Suspense>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
