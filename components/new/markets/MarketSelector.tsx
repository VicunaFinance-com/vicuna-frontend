"use client";

import { useSelectedMarket } from "@/hooks";

export const MarketSelector = () => {
  const { marketID, availableMarkets, setMarketID } = useSelectedMarket();

  if (availableMarkets.length <= 1) return null;

  return (
    <div className="flex items-center justify-center bg-card text-secondary-foreground rounded-[var(--radius)] p-2 space-x-2">
      {availableMarkets.map((market) => (
        <button
          key={market}
          onClick={() => setMarketID(market)}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
            marketID === market
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-transparent text-primary hover:bg-primary/20"
          }`}
        >
          {market}
        </button>
      ))}
    </div>
  );
};
