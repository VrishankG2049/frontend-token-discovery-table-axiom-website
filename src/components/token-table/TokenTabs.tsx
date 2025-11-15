"use client";

import { cn } from "@/lib/utils";

interface TokenTabsProps {
  category: "new_pairs" | "final_stretch" | "migrated";
  setCategory: (c: "new_pairs" | "final_stretch" | "migrated") => void;
}

export function TokenTabs({ category, setCategory }: TokenTabsProps) {
  const tabs = [
    { id: "new_pairs", label: "New Pairs" },
    { id: "final_stretch", label: "Final Stretch" },
    { id: "migrated", label: "Migrated" },
  ] as const;

  return (
    <div className="flex items-center gap-2 mt-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition",
            category === tab.id
              ? "bg-slate-100 text-slate-950"
              : "bg-slate-900/40 text-slate-400 hover:bg-slate-900/60"
          )}
          onClick={() => setCategory(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
