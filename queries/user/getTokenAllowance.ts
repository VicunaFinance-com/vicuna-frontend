import { ClientMap } from "@/constants";
import { Address, Chain } from "viem";
import { erc20Abi } from "viem";

export const getTokenAllowance = async (
  userAddress: Address,
  chainID: Chain["id"],
  token: Address,
  spender: Address
) =>
  await ClientMap[chainID].readContract({
    address: token,
    abi: erc20Abi,
    functionName: "allowance",
    args: [userAddress, spender],
  });
