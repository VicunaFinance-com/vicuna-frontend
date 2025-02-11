import {
  Addresses,
  ClientMap,
  MARKET_DEFINITIONS,
  UiPoolDataProviderV3Abi,
} from "@/constants";
import { Address } from "viem";

export const getUserReservesData = async (marketID: string, user: Address) =>
  await ClientMap[MARKET_DEFINITIONS[marketID].chainID].readContract({
    address:
      Addresses[MARKET_DEFINITIONS[marketID].chainID].CONTRACTS
        .MARKET_DATA_PROVIDER,
    abi: UiPoolDataProviderV3Abi,
    functionName: "getUserReservesData",
    args: [MARKET_DEFINITIONS[marketID].POOL_ADDRESS_PROVIDER, user],
  });
