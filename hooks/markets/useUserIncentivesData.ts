import { bnToNumber } from "@/helpers";
import { useUserIncentivesDataRaw } from "@/hooks";
import { Address } from "viem";

const useUserIncentivesData = (tokenAddress: Address) => {
  const {
    isUserIncentivesDataLoading,
    userIncentivesData,
    invalidateUserIncentivesDataRawQuery,
  } = useUserIncentivesDataRaw();

  if (isUserIncentivesDataLoading) {
    return {
      invalidateUserIncentivesDataQuery: invalidateUserIncentivesDataRawQuery,
      supplyIncentives: {
        unclaimedRewards: 0,
        tokenRewards: [] as {
          tokenAddress: Address;
          unclaimedRewards: number;
        }[],
      },
      borrowIncentives: {
        unclaimedRewards: 0,
        tokenRewards: [] as {
          tokenAddress: Address;
          unclaimedRewards: number;
        }[],
      },
    };
  }

  const tokenUserIncentiveData = userIncentivesData!.find(
    (data) => data.underlyingAsset.toLowerCase() === tokenAddress.toLowerCase()
  );

  const processIncentiveData = (
    userData: NonNullable<
      typeof userIncentivesData
    >[number]["aTokenIncentivesUserData"]
  ) => {
    const tokenRewards: { tokenAddress: Address; unclaimedRewards: number }[] =
      [];

    userData.userRewardsInformation.forEach((reward) => {
      const unclaimedRewards = bnToNumber(
        reward.userUnclaimedRewards,
        reward.rewardTokenDecimals
      );
      const priceFeed = bnToNumber(reward.rewardPriceFeed, 8);
      const adjustedUnclaimedRewards = unclaimedRewards * priceFeed;
      tokenRewards.push({
        tokenAddress: reward.rewardTokenAddress,
        unclaimedRewards: adjustedUnclaimedRewards,
      });
    });

    return {
      unclaimedRewards: tokenRewards.reduce(
        (sum, reward) => sum + reward.unclaimedRewards,
        0
      ),
      tokenRewards,
    };
  };

  return {
    invalidateUserIncentivesDataQuery: invalidateUserIncentivesDataRawQuery,
    supplyIncentives: processIncentiveData(
      tokenUserIncentiveData!.aTokenIncentivesUserData
    ),
    borrowIncentives: processIncentiveData(
      tokenUserIncentiveData!.vTokenIncentivesUserData
    ),
  };
};

export { useUserIncentivesData };
