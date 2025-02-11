import { Address } from "viem";
import { useUserDataRaw } from "@/hooks";

const useUserData = (tokenAddress: Address) => {
  const { isUserDataLoading, userData, invalidateUserDataRawQuery } =
    useUserDataRaw();

  return {
    isUserDataLoading,
    userData: userData?.find((data) => data.underlyingAsset === tokenAddress),
    invalidateUserDataQuery: invalidateUserDataRawQuery,
  };
};

export { useUserData };
