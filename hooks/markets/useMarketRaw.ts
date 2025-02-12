import { Addresses, isNativeToken } from "@/constants";
import { useMarketsRaw } from "@/hooks";
import { Token } from "@/types";
import { useChainId } from "wagmi";

const useMarketRaw = (token: Token) => {
  const chainID = useChainId();
  let tokenAddress = token.address;
  if (isNativeToken(token.address, chainID)) {
    tokenAddress = Addresses[chainID].TOKENS.WRAPPED_NATIVE_TOKEN;
  }
  const { marketsData, isMarketsDataLoading, invalidateMarketsRawQuery } =
    useMarketsRaw();
  return {
    marketData: marketsData?.find(
      (m) => m.underlyingAsset.toLowerCase() === tokenAddress.toLowerCase()
    ),
    isMarketsDataLoading,
    invalidateMarketRawQuery: invalidateMarketsRawQuery,
  };
};

export { useMarketRaw };
