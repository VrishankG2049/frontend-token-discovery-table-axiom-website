"use client";

import React from "react";
import type { TokenRow as TRow, TokenCategory } from "@/lib/types";
import { PriceCell } from "./PriceCell";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Props {
  index: number;
  row: TRow;
  category: TokenCategory;
}

function TokenRowItemBase({ index, row, category }: Props) {
  const categoryLabel =
    category === "newPairs"
      ? "New"
      : category === "finalStretch"
      ? "Final"
      : "Migrated";

  const flowColor =
    row.priceChange5m > 0
      ? "text-emerald-400"
      : row.priceChange5m < 0
      ? "text-red-400"
      : "text-slate-300";

  return (
    <div
      className={cn(
        "group flex items-stretch justify-between rounded-xl border border-slate-900/80 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-100 transition-all duration-150",
        "hover:border-slate-600 hover:bg-slate-900/80 hover:shadow-[0_0_28px_rgba(15,23,42,0.9)]"
      )}
    >
      {/* Left: Index + Token Name */}
      <div className="flex flex-[2] items-center gap-2">
        <span className="w-6 text-center text-[11px] text-slate-500">
          {index}
        </span>

        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-[10px] text-slate-200 uppercase">
          {row.symbol.slice(0, 3)}
        </span>

        <div className="flex min-w-0 flex-col">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="max-w-[120px] truncate text-xs font-semibold sm:max-w-[180px] sm:text-sm">
                  {row.name}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">{row.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-slate-500">
            {row.symbol}
            <span className="rounded-full bg-slate-900/80 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-slate-400">
              {categoryLabel}
            </span>
          </span>
        </div>
      </div>

      {/* Right: Metrics */}
      <div className="flex flex-[3] items-center justify-between gap-3 text-[11px] sm:text-xs">
        {/* Numbers */}
        <div className="flex flex-1 items-center justify-between gap-3">
          <span className="min-w-[60px] text-right">{row.ageMinutes}m</span>

          <PriceCell id={row.id} value={row.price} />

          <span className="min-w-[70px] text-right tabular-nums">
            ${(row.marketCap / 1_000).toFixed(1)}k
          </span>
          <span className="hidden min-w-[70px] text-right tabular-nums sm:inline">
            ${(row.liquidity / 1_000).toFixed(1)}k
          </span>
          <span className="min-w-[70px] text-right tabular-nums">
            ${(row.volume24h / 1_000).toFixed(1)}k
          </span>
          <span className="hidden min-w-[60px] text-right tabular-nums md:inline">
            {row.txCount}
          </span>
        </div>

        {/* Price Flow */}
        <div className="hidden min-w-[80px] flex-1 flex-col items-end sm:flex">
          <span className={flowColor}>{row.priceChange1m.toFixed(2)}% 1m</span>
          <span
            className={cn(
              "text-[10px]",
              row.priceChange5m >= 0 ? "text-emerald-400" : "text-red-400"
            )}
          >
            {row.priceChange5m.toFixed(2)}% 5m
          </span>
        </div>

        {/* Quick Buy Modal */}
        <div className="flex min-w-[80px] flex-1 items-center justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-emerald-500 text-[11px] font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Quick Buy
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Quick Buy – {row.symbol}</DialogTitle>
                <DialogDescription>
                  Demo only — plug into actual swap later.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-3 space-y-3 text-xs">
                <p className="flex items-center justify-between">
                  <span>Price</span>
                  <span className="tabular-nums">${row.price.toFixed(6)}</span>
                </p>
                <Button className="w-full rounded-full">
                  Confirm Market Buy
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export const TokenRowItem = React.memo(
  TokenRowItemBase,
  (prev, next) =>
    prev.row.id === next.row.id &&
    prev.row.price === next.row.price &&
    prev.index === next.index &&
    prev.category === next.category
);
