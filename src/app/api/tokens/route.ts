import { NextResponse } from "next/server";
import type { TokenRow } from "@/lib/types";

const CATEGORIES: TokenRow["category"][] = [
  "new_pairs",
  "final_stretch",
  "migrated",
];

function makeToken(i: number): TokenRow {
  const category = CATEGORIES[i % CATEGORIES.length];
  const basePrice = 0.1 + (i % 10) * 0.03;
  const randomFactor = 1 + (Math.random() - 0.5) * 0.2;

  return {
    id: `token-${i}`,
    name: `Example Token ${i}`,
    symbol: `TKN${i}`,
    ageMinutes: Math.floor(Math.random() * 90),
    marketCap: 500_000 * randomFactor,
    liquidity: 200_000 * randomFactor,
    volume24h: 150_000 * randomFactor,
    txCount: 80 + Math.floor(Math.random() * 200),
    price: basePrice * randomFactor,
    priceChange1m: (Math.random() - 0.5) * 8,
    priceChange5m: (Math.random() - 0.5) * 12,
    category,
  };
}

export async function GET() {
  // Simulate latency for Lighthouse test
  await new Promise((resolve) => setTimeout(resolve, 400));

  const rows: TokenRow[] = Array.from({ length: 60 }, (_, idx) =>
    makeToken(idx + 1)
  );

  return NextResponse.json({
    newPairs: rows.filter((t) => t.category === "new_pairs"),
    finalStretch: rows.filter((t) => t.category === "final_stretch"),
    migrated: rows.filter((t) => t.category === "migrated"),
  });
}
