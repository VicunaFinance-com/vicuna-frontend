import { ClientMap, isNativeToken, S } from "@/constants";
import { Address, Chain } from "viem";
import { erc20Abi } from "viem";

export const getTokenBalance = async (
  userAddress: Address,
  chainID: Chain["id"],
  token: Address
) => {
  const client = ClientMap[chainID];
  if (isNativeToken(token, chainID)) {
    return await client.getBalance({ address: userAddress });
  }
  return await client.readContract({
    address: token,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [userAddress],
  });
};

export const getTokenBalances = async (
  userAddress: Address,
  chainID: Chain["id"],
  tokens: Address[]
) => {
  const balances = await Promise.all(
    tokens.map((token) => getTokenBalance(userAddress, chainID, token))
  );
  const balanceByToken = Object.fromEntries(
    tokens.map((key, i) => [key, balances[i]])
  );
  return balanceByToken;
};
