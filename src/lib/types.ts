export type TokenCategory = "newPairs" | "finalStretch" | "migrated";

export type SortDirection = "asc" | "desc";

export type SortKey =
  | "ageMinutes"
  | "marketCap"
  | "liquidity"
  | "volume24h"
  | "txCount"
  | "price";

export interface TokenRow {
  id: string;
  name: string;
  symbol: string;
  ageMinutes: number;
  marketCap: number;
  liquidity: number;
  volume24h: number;
  txCount: number;
  price: number;
  priceChange1m: number;
  priceChange5m: number;
  buyers: number;
  sellers: number;
  devHoldingPct: number;
  snipersPct: number;
  category: TokenCategory;
}
