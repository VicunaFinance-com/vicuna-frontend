import { Address } from "viem";

export type TokenBalance = {
  token: string;
  balance: number;
};

export type Token = {
  name: string;
  symbol: string;
  address: Address;
  decimals: number;
  icon: string;
};
