import {
  useSelectedMarket,
  useMarketsRaw,
  useTokenBalance,
  useUserAccountData,
  useUserDataRaw,
  useIncentivesData,
} from "@/hooks";
import { Token } from "@/types";
import { useCallback } from "react";

const useInvalidate = (token: Token) => {
  const { invalidateMarketsRawQuery } = useMarketsRaw();
  const { invalidateUserDataRawQuery } = useUserDataRaw();
  const { invalidateUserAccountDataQuery } = useUserAccountData();
  const { invalidateTokenBalanceQuery } = useTokenBalance(token.address);
  const { invalidateIncentiveDataQuery } = useIncentivesData(token.address);
  const { marketID } = useSelectedMarket();

  const invalidateMarketState = useCallback(() => {
    invalidateMarketsRawQuery(marketID);
    invalidateUserDataRawQuery(marketID);
    invalidateUserAccountDataQuery(marketID);
    invalidateIncentiveDataQuery(marketID);
    invalidateTokenBalanceQuery();
  }, [
    invalidateMarketsRawQuery,
    invalidateUserDataRawQuery,
    invalidateUserAccountDataQuery,
    invalidateTokenBalanceQuery,
    invalidateIncentiveDataQuery,
    marketID,
  ]);

  return {
    invalidateMarketState,
  };
};

export { useInvalidate };
