import { useQueries } from "@tanstack/react-query";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useCorrectChain } from "@/hooks";
import { queryKeys } from "@/queries";
import { isAddressValid } from "@/helpers";

const useTokenBalances = (tokenAddresses: Address[]) => {
  const { isCorrectChain, chainIdToUse: chainId } = useCorrectChain();
  const { address: userAddress } = useAccount();

  const validTokenAddresses = tokenAddresses.filter(isAddressValid);
  const queryResults = useQueries({
    queries: validTokenAddresses.map((tokenAddress) => ({
      ...queryKeys.user
        .chain(userAddress!, chainId!)
        ._ctx.tokenBalance(tokenAddress),
      enabled: isAddressValid(userAddress) && isCorrectChain,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      staleTime: Infinity,
      refetchInterval: 15000,
    })),
  });
  const isLoading = queryResults.some((result) => result.isLoading);
  const balancesArray: { token: string; amount: bigint }[] = [];
  const balancesObj: { [token: string]: bigint } = {};
  if (!isLoading) {
    queryResults.forEach((result, index) => {
      const tokenAddress = validTokenAddresses[index];
      const balance =
        /* bnToBn(result.data); */ result.error || !result.data
          ? BigInt(0)
          : result.data;
      balancesArray.push({ token: tokenAddress, amount: balance });
      balancesObj[tokenAddress] = balance;
    });
  }

  return {
    isBalancesLoading: isLoading,
    balancesArray,
    balancesObj,
  };
};

export { useTokenBalances };
