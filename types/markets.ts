import { Address, Chain } from "viem";
import { Token } from "@/types";

export type MarketInfo = {
  asset: {
    name: string;
    symbol: string;
    imageSrc: string;
  };
  totalSupplied: {
    amount: number;
    value: number;
  };
  supplyAPY: number;
  totalBorrowed: {
    amount: number;
    value: number;
  };
  borrowAPY: number;
  collateralFactor: number;
};

export type UserDisplayData = {
  balanceValueUSD: number;
  balance: number;
  borrowedValueUSD: number;
  borrowed: number;
  borrowLimit: {
    current: number;
    future: number;
  };
  totalDebt: {
    current: number;
    future: number;
  };
  healthFactor: {
    current: number;
    future: number;
  };
  tokenPriceUSD: number;
};

export type MarketDefinition = {
  tokens: Token[];
  POOL_ADDRESS_PROVIDER: Address;
  AAVE_POOL: Address;
  NATIVE_TOKEN_GATEWAY: Address;
  chainID: Chain["id"];
};
