import { queryKeys } from "@/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Address } from "viem";
import { useCorrectChain } from "@/hooks";
import { isAddressValid } from "@/helpers";
import { useAccount } from "wagmi";
import { useCallback } from "react";

const useAllowance = (spenderAddress: Address, tokenAddress: Address) => {
  const queryClient = useQueryClient();

  const { isCorrectChain, chainIdToUse: chainId } = useCorrectChain();
  const { address: approverAddress } = useAccount();
  const isEnabled =
    isCorrectChain &&
    isAddressValid(approverAddress) &&
    isAddressValid(spenderAddress) &&
    isAddressValid(tokenAddress);

  const { isLoading: isAllowanceLoading, data } = useQuery({
    ...queryKeys.user
      .chain(approverAddress!, chainId)
      ._ctx.tokenAllowance(tokenAddress, spenderAddress),
    enabled: isEnabled,
    staleTime: Infinity,
  });

  const invalidateAllowanceQuery = useCallback(async () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.user
        .chain(approverAddress!, chainId)
        ._ctx.tokenAllowance(tokenAddress, spenderAddress).queryKey,
    });
  }, [approverAddress, chainId, queryClient, spenderAddress, tokenAddress]);

  return {
    isAllowanceLoading,
    allowance: data,
    invalidateAllowanceQuery,
  };
};

export { useAllowance };
