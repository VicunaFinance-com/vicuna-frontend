import {
  Addresses,
  ClientMap,
  MARKET_DEFINITIONS,
  UiPoolDataProviderV3Abi,
} from "@/constants";

export const getMarketData = async (marketID: string) =>
  await ClientMap[MARKET_DEFINITIONS[marketID].chainId].readContract({
    address:
      Addresses[MARKET_DEFINITIONS[marketID].chainId].CONTRACTS
        .MARKET_DATA_PROVIDER,
    abi: UiPoolDataProviderV3Abi,
    functionName: "getReservesData",
    args: [MARKET_DEFINITIONS[marketID].POOL_ADDRESS_PROVIDER],
  });
