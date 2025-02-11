import { Address, Chain } from "viem";
import { sonic } from "viem/chains";

export const Addresses: {
  [key: Chain["id"]]: {
    TOKENS: { [key: string]: Address; NATIVE_TOKEN: Address };
    CONTRACTS: { [key: string]: Address };
  };
} = {
  [sonic.id]: {
    TOKENS: {
      S: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      WS: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
      USDC_E: "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
      scUSD: "0xd3DCe716f3eF535C5Ff8d041c1A41C3bd89b97aE",
      BRUSH: "0xE51EE9868C1f0d6cd968A8B8C8376Dc2991BFE44",
      wETH: "0x50c42dEAcD8Fc9773493ED674b675bE577f2634b",
      NATIVE_TOKEN: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      WRAPPED_NATIVE_TOKEN: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
    },
    CONTRACTS: {
      MARKET_DATA_PROVIDER: "0x5E37B180aAa815cf2F2d9a9118a74f44fa144072",
      INCENTIVE_DATA_PROVIDER: "0xfB324353E69c9E2e3f374f34025AafeF644b2Bd0",
    },
  },
};
