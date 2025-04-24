import { Address, Chain } from "viem";
import { sonic } from "viem/chains";

export const Addresses: {
  [key: Chain["id"]]: {
    CONTRACTS: { [key: string]: Address };
  };
} = {
  [sonic.id]: {
    CONTRACTS: {
      MARKET_DATA_PROVIDER: "0xAC2b7EADb55858700B8567aB5Ca7863101508304",
      sbUSD_MARKET_DATA_PROVIDER: "0x991dE4D59eBD7961dD568374792CF74092D11b0a",
      INCENTIVE_DATA_PROVIDER: "0xfB324353E69c9E2e3f374f34025AafeF644b2Bd0",
      UI_HELPER: "0x3E666013Ba8C25eF46B38d82a6E152Adf359e0A9",
      REDEMPTION: "0x2183ba57760d4c2a228713923aCd652D21d30b5d",
    },
  },
};
