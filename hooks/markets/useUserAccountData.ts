import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/queries";
import { useAccount } from "wagmi";
import { useCallback } from "react";

const useUserAccountData = (marketID: string) => {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { data: userAccountData, isLoading: isUserAccountDataLoading } =
    useQuery({
      ...queryKeys.markets.market(marketID)._ctx.userAccountData(address!),
      staleTime: Infinity,
      refetchInterval: 30000,
      refetchOnWindowFocus: "always",
    });

  const invalidateUserAccountDataQuery = useCallback(
    async (marketID: string) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.markets
          .market(marketID)
          ._ctx.userAccountData(address!).queryKey,
        refetchType: "active",
      });
    },
    [queryClient, address, marketID]
  );
  return {
    isUserAccountDataLoading,
    userAccountData: {
      totalCollateralBase: userAccountData?.[0],
      totalDebtBase: userAccountData?.[1],
      availableBorrowsBase: userAccountData?.[2],
      currentLiquidationThreshold: userAccountData?.[3],
      ltv: userAccountData?.[4],
      healthFactor: userAccountData?.[5],
    },
    invalidateUserAccountDataQuery,
  };
};

export { useUserAccountData };
