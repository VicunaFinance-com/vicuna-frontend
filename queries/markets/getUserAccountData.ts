import { AavePoolAbi, ClientMap, MARKET_DEFINITIONS } from "@/constants";
import { Address } from "viem";

export const getUserAccountData = async (marketID: string, user: Address) =>
  await ClientMap[MARKET_DEFINITIONS[marketID].chainID].readContract({
    address: MARKET_DEFINITIONS[marketID].AAVE_POOL,
    abi: AavePoolAbi,
    functionName: "getUserAccountData",
    args: [user],
  });
