import { createQueryKeys } from "@lukemorales/query-key-factory";
import { Address } from "viem";
import {
  getIncentivesData,
  getMarketData,
  getUserAccountData,
  getUserReservesData,
  getUserIncentivesData,
} from ".";

export const marketsQueries = createQueryKeys("markets", {
  market: (marketID: string) => ({
    queryKey: [marketID],
    contextQueries: {
      marketsData: () => ({
        queryKey: ["marketsData"],
        queryFn: async () => {
          return await getMarketData(marketID);
        },
      }),
      userReservesData: (user: Address) => ({
        queryKey: ["userReservesData", user],
        queryFn: async () => {
          return await getUserReservesData(marketID, user);
        },
      }),
      userAccountData: (user: Address) => ({
        queryKey: ["userAccountData", user],
        queryFn: async () => {
          return await getUserAccountData(marketID, user);
        },
      }),
      incentivesData: () => ({
        queryKey: ["incentivesData"],
        queryFn: async () => {
          return await getIncentivesData(marketID);
        },
      }),
      userIncentivesData: (user: Address) => ({
        queryKey: ["userIncentivesData", user],
        queryFn: async () => {
          return await getUserIncentivesData(marketID, user);
        },
      }),
    },
  }),
});
