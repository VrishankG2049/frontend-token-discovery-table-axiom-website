"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TokenCategory, SortDirection, SortKey } from "@/lib/types";

interface SortState {
  key: SortKey;
  direction: SortDirection;
}

interface TokensState {
  sort: Record<TokenCategory, SortState>;
}

const defaultSort: SortState = {
  key: "volume24h",
  direction: "desc",
};

const initialState: TokensState = {
  sort: {
    newPairs: { ...defaultSort },
    finalStretch: { ...defaultSort },
    migrated: { ...defaultSort },
  },
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setSort(
      state,
      action: PayloadAction<{ category: TokenCategory; key: SortKey }>
    ) {
      const { category, key } = action.payload;
      const current = state.sort[category];

      if (current.key === key) {
        current.direction = current.direction === "asc" ? "desc" : "asc";
      } else {
        state.sort[category] = { key, direction: "desc" };
      }
    },
  },
});

export const { setSort } = tokensSlice.actions;
export default tokensSlice.reducer;
