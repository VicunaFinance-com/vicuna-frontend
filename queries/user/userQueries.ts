import { createQueryKeys } from "@lukemorales/query-key-factory";
import { Address } from "viem";
import { getTokenAllowance, getTokenBalance } from ".";

export const userQueries = createQueryKeys("user", {
  chain: (userAddress: Address, chainId: number) => ({
    queryKey: [userAddress, chainId],
    contextQueries: {
      tokenAllowance: (token: Address, spender: Address) => ({
        queryKey: [token, spender],
        queryFn: async () => {
          const allowance = await getTokenAllowance(
            userAddress,
            chainId,
            token,
            spender
          );
          return allowance;
        },
      }),
      tokenBalance: (token: Address) => ({
        queryKey: [token],
        queryFn: async () => {
          const walletBalance = await getTokenBalance(
            userAddress,
            chainId,
            token
          );
          return walletBalance;
        },
      }),
    },
  }),
});
