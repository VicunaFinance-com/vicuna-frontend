import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelectedMarket } from "@/hooks";
import { queryKeys } from "@/queries";
import { useCallback } from "react";

const useIncentivesDataRaw = () => {
  const queryClient = useQueryClient();
  const { marketID } = useSelectedMarket();
  const { data: incentivesData, isLoading: isIncentivesDataLoading } = useQuery(
    {
      ...queryKeys.markets.market(marketID)._ctx.incentivesData(),
      staleTime: Infinity,
      refetchInterval: 30000,
      refetchOnWindowFocus: "always",
    }
  );
  const invalidateIncentivesDataRawQuery = useCallback(
    async (marketID: string) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.markets.market(marketID)._ctx.incentivesData()
          .queryKey,
      });
    },
    [queryClient, marketID]
  );

  return {
    isIncentivesDataLoading,
    incentivesData,
    invalidateIncentivesDataRawQuery,
  };
};

export { useIncentivesDataRaw };
