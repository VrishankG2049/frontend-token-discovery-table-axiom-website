"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { socket } from "@/lib/socket";

interface PriceCellProps {
  id: string;
  value: number;
}

export function PriceCell({ id, value }: PriceCellProps) {
  const [displayPrice, setDisplayPrice] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    // Update base price from props (initial fetch or refetch)
    if (value !== previous.current) {
      previous.current = value;
      setDisplayPrice(value);
    }
  }, [value]);

  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    // Listen to WebSocket pushed updates
    const listener = (update: { id: string; price: number }) => {
      if (update.id === id) {
        // Trigger flash animation
        setFlash(update.price > displayPrice ? "up" : "down");
        setDisplayPrice(update.price);

        // Reset flash glow after animation
        setTimeout(() => setFlash(null), 500);
      }
    };

    socket.subscribe(listener);
    return () => {};
  }, [id, displayPrice]);

  return (
    <span
      className={cn(
        "inline-flex min-w-[70px] justify-end rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums transition-colors duration-300",
        flash === "up" &&
          "bg-emerald-500/20 text-emerald-200 shadow-[0_0_10px_rgba(52,211,153,0.4)]",
        flash === "down" &&
          "bg-red-500/20 text-red-200 shadow-[0_0_10px_rgba(239,68,68,0.4)]",
        !flash && "text-slate-200"
      )}
    >
      ${displayPrice.toFixed(4)}
    </span>
  );
}
