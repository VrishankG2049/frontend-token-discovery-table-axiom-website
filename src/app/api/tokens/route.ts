import { NextResponse } from "next/server";
import type { TokenRow } from "@/lib/types";

const CATEGORIES: TokenRow["category"][] = [
  "newPairs",
  "finalStretch",
  "migrated",
];

function makeToken(i: number): TokenRow {
  const category = CATEGORIES[i % CATEGORIES.length];

  return {
    id: `token-${i}`,
    name: `Example Token ${i}`,
    symbol: `TKN${i}`,
    ageMinutes: Math.floor(Math.random() * 90),
    price: 0.1 + Math.random() * 0.3,
    priceChange1m: (Math.random() - 0.5) * 8,
    priceChange5m: (Math.random() - 0.5) * 12,
    marketCap: 300_000 + Math.random() * 200_000,
    volume24h: 120_000 + Math.random() * 100_000,
    liquidity: 150_000 + Math.random() * 100_000,
    txCount: Math.floor(Math.random() * 300),
    category,
  };
}

export async function GET() {
  const rows: TokenRow[] = Array.from({ length: 60 }, (_, idx) =>
    makeToken(idx + 1)
  );

  const grouped = {
    newPairs: rows.filter((t) => t.category === "newPairs"),
    finalStretch: rows.filter((t) => t.category === "finalStretch"),
    migrated: rows.filter((t) => t.category === "migrated"),
  };

  return NextResponse.json(grouped);
}
