import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelectedMarket } from "@/hooks";
import { queryKeys } from "@/queries";
import { useAccount } from "wagmi";
import { isAddressValid } from "@/helpers";
import { useCallback } from "react";

const useUserDataRaw = () => {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { marketID } = useSelectedMarket();
  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    ...queryKeys.markets.market(marketID)._ctx.userReservesData(address!),
    enabled: isAddressValid(address),
    staleTime: Infinity,
    refetchInterval: 30000,
    refetchOnWindowFocus: "always",
  });
  const invalidateUserDataRawQuery = useCallback(
    async (marketID: string) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.markets
          .market(marketID)
          ._ctx.userReservesData(address!).queryKey,
      });
    },
    [queryClient, address, marketID]
  );

  return {
    isUserDataLoading,
    userData: userData?.[0],
    invalidateUserDataRawQuery,
  };
};

export { useUserDataRaw };
