import { Addresses, isNativeToken } from "@/constants";
import { bnToNumber } from "@/helpers";
import { useIncentivesDataRaw } from "@/hooks";
import { Address } from "viem";
import { useChainId } from "wagmi";

const useIncentivesData = (tokenAddress: Address) => {
  const chainID = useChainId();
  if (isNativeToken(tokenAddress, chainID)) {
    tokenAddress = Addresses[chainID].TOKENS.WRAPPED_NATIVE_TOKEN;
  }
  const {
    incentivesData,
    isIncentivesDataLoading,
    invalidateIncentivesDataRawQuery,
  } = useIncentivesDataRaw();

  if (isIncentivesDataLoading) {
    return {
      invalidateIncentiveDataQuery: invalidateIncentivesDataRawQuery,
      supplyIncentives: {
        rewardsPerSecond: 0,
        tokenRewards: [] as {
          tokenAddress: Address;
          rewardsPerSecond: number;
        }[],
      },
      borrowIncentives: {
        rewardsPerSecond: 0,
        tokenRewards: [] as {
          tokenAddress: Address;
          rewardsPerSecond: number;
        }[],
      },
    };
  }

  const tokenIncentiveData = incentivesData!.find(
    (data) => data.underlyingAsset.toLowerCase() === tokenAddress.toLowerCase()
  );

  const processIncentiveData = (
    incentiveData: NonNullable<typeof incentivesData>[number]["aIncentiveData"]
  ) => {
    const tokenRewards: { tokenAddress: Address; rewardsPerSecond: number }[] =
      [];

    incentiveData.rewardsTokenInformation.forEach((reward) => {
      const tokenRewardPerSecond = bnToNumber(
        reward.emissionPerSecond,
        reward.rewardTokenDecimals
      );

      const priceFeed = bnToNumber(reward.rewardPriceFeed, 8);

      const adjustedRewardPerSecond = tokenRewardPerSecond * priceFeed;
      tokenRewards.push({
        tokenAddress: reward.rewardTokenAddress,
        rewardsPerSecond: adjustedRewardPerSecond,
      });
    });

    return {
      rewardsPerSecond: tokenRewards.reduce(
        (sum, reward) => sum + reward.rewardsPerSecond,
        0
      ),
      tokenRewards,
    };
  };

  return {
    invalidateIncentiveDataQuery: invalidateIncentivesDataRawQuery,
    supplyIncentives: processIncentiveData(tokenIncentiveData!.aIncentiveData),
    borrowIncentives: processIncentiveData(tokenIncentiveData!.vIncentiveData),
  };
};

export { useIncentivesData };
