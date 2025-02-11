import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelectedMarket } from "@/hooks";
import { queryKeys } from "@/queries";
import { useCallback } from "react";

const useMarketsRaw = () => {
  const queryClient = useQueryClient();
  const { marketID } = useSelectedMarket();
  const { data: marketsData, isLoading: isMarketsDataLoading } = useQuery({
    ...queryKeys.markets.market(marketID)._ctx.marketsData(),
    staleTime: Infinity,
    refetchInterval: 30000,
    refetchOnWindowFocus: "always",
  });
  const invalidateMarketsRawQuery = useCallback(
    async (marketID: string) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.markets.market(marketID)._ctx.marketsData()
          .queryKey,
      });
    },
    [queryClient]
  );
  return {
    isMarketsDataLoading,
    marketsData,
    invalidateMarketsRawQuery,
  };
};

export { useMarketsRaw };
