import { Address } from "viem";
import { useIncentivesData, useMarketsRaw } from "@/hooks";
import { Addresses, getTokenByAddress, isNativeToken } from "@/constants";
import { MarketInfo } from "@/types";
import { bnToNumber } from "@/helpers";
import { useChainId } from "wagmi";

const RAY = 1e27;
const BASIS_POINTS_DIVISOR = BigInt(10000);
const PRICE_DECIMALS = 8;

const useMarket = (tokenAddress: Address) => {
  const chainID = useChainId();
  if (isNativeToken(tokenAddress, chainID)) {
    tokenAddress = Addresses[chainID].TOKENS.WRAPPED_NATIVE_TOKEN;
  }
  const { isMarketsDataLoading, marketsData, invalidateMarketsRawQuery } =
    useMarketsRaw();

  const incentivesData = useIncentivesData(tokenAddress);

  const rawMarket = marketsData?.find(
    (market) =>
      market.underlyingAsset.toLowerCase() === tokenAddress.toLowerCase()
  );

  if (!rawMarket) {
    return {
      isMarketLoading: isMarketsDataLoading,
      market: undefined,
      marketBnData: undefined,
      supplyIncentives: incentivesData.supplyIncentives,
      borrowIncentives: incentivesData.borrowIncentives,
    };
  }

  const token = getTokenByAddress(tokenAddress);

  const symbol = token?.symbol ?? rawMarket.symbol;
  const name = token?.name ?? rawMarket.name;
  const decimals = token?.decimals ?? bnToNumber(rawMarket.decimals);
  const icon = token?.icon ?? "/icons/coins/unknown.png";

  const stableDebt = rawMarket.totalPrincipalStableDebt;
  const variableDebt = rawMarket.totalScaledVariableDebt;
  const availableLiquidity = rawMarket.availableLiquidity;
  const totalBorrowed = stableDebt + variableDebt;
  const totalSupplied = rawMarket.atokenTotalSupply;

  const supplyAPY = (Number(rawMarket.liquidityRate) * 100) / RAY;
  const borrowAPY = (Number(rawMarket.variableBorrowRate) * 100) / RAY;

  const collateralFactor = rawMarket.baseLTVasCollateral / BASIS_POINTS_DIVISOR;

  const price = rawMarket.priceInMarketReferenceCurrency;
  const totalSuppliedValue = bnToNumber(
    totalSupplied * price,
    decimals + PRICE_DECIMALS
  );
  const totalBorrowedValue = bnToNumber(
    totalBorrowed * price,
    decimals + PRICE_DECIMALS
  );

  const marketInfo: MarketInfo = {
    asset: {
      name,
      symbol,
      imageSrc: icon,
    },
    totalSupplied: {
      amount: bnToNumber(totalSupplied, decimals),
      value: Number(totalSuppliedValue),
    },
    supplyAPY: supplyAPY,
    totalBorrowed: {
      amount: bnToNumber(totalBorrowed, decimals),
      value: Number(totalBorrowedValue),
    },
    borrowAPY: borrowAPY,
    collateralFactor: Number(collateralFactor),
  };

  return {
    isMarketLoading: isMarketsDataLoading,
    market: marketInfo,
    marketBnData: {
      totalSupplied,
      totalBorrowed,
      availableLiquidity,
      supplyCap:
        ((rawMarket.supplyCap * BigInt(10 ** decimals) - totalSupplied) *
          BigInt(999999)) /
        BigInt(1000000),
      borrowCap: rawMarket.borrowCap * BigInt(10 ** decimals) - totalBorrowed,
    },
    invalidateMarketQuery: invalidateMarketsRawQuery,
    supplyIncentives: {
      ...incentivesData.supplyIncentives,
      apr:
        (incentivesData.supplyIncentives.rewardsPerSecond * 3600 * 24 * 365) /
        totalSuppliedValue,
    },
    borrowIncentives: {
      ...incentivesData.borrowIncentives,
      apr:
        (incentivesData.borrowIncentives.rewardsPerSecond * 3600 * 24 * 365) /
        totalBorrowedValue,
    },
  };
};

export { useMarket };
