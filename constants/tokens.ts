import { Token } from "@/types";
import { Addresses } from ".";
import { sonic } from "viem/chains";
import { Address } from "viem";

export const S: Token = {
  name: "Sonic",
  symbol: "S",
  address: Addresses[sonic.id].TOKENS.S,
  decimals: 18,
  icon: "/icons/coins/sonic.png",
};

export const wS: Token = {
  name: "Wrapped Sonic",
  symbol: "S",
  address: Addresses[sonic.id].TOKENS.WS,
  decimals: 18,
  icon: "/icons/coins/wsonic.png",
};

export const USDCE: Token = {
  name: "Bridged USDC",
  symbol: "USDC.E",
  address: Addresses[sonic.id].TOKENS.USDC_E,
  decimals: 6,
  icon: "/icons/coins/usdc.png",
};

export const scUSD: Token = {
  name: "scUSD",
  symbol: "scUSD",
  address: Addresses[sonic.id].TOKENS.scUSD,
  decimals: 6,
  icon: "/icons/coins/scusdc.png",
};

export const USDT: Token = {
  name: "USDT",
  symbol: "USDT",
  address: Addresses[sonic.id].TOKENS.USDT,
  decimals: 6,
  icon: "/icons/coins/usdt.png",
};

export const wETH: Token = {
  name: "Wrapped ETH",
  symbol: "wETH",
  address: Addresses[sonic.id].TOKENS.wETH,
  decimals: 18,
  icon: "/icons/coins/wsteth.png",
};

const ALL_TOKENS = [S, wS, USDCE, scUSD, wETH, USDT];

export const isNativeToken = (token: Address, chainID: number) => {
  if (!Addresses[chainID]) return false;
  return (
    token.toLowerCase() === Addresses[chainID].TOKENS.NATIVE_TOKEN.toLowerCase()
  );
};

export const isWrappedNativeToken = (token: Address, chainID: number) => {
  if (!Addresses[chainID]) return false;
  return (
    token.toLowerCase() ===
    Addresses[chainID].TOKENS.WRAPPED_NATIVE_TOKEN.toLowerCase()
  );
};

export const getTokenByAddress = (address: string) => {
  return ALL_TOKENS.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
};

export const getNativeToken = (chainID: number) =>
  getTokenByAddress(Addresses[chainID].TOKENS.NATIVE_TOKEN)!;
export const getWrappedNativeToken = (chainID: number) =>
  getTokenByAddress(Addresses[chainID].TOKENS.WRAPPED_NATIVE_TOKEN)!;
