import { MarketDefinition } from "@/types";
import { sonic } from "viem/chains";
import { S, wS, scUSD, USDCE, wETH } from "@/constants";

export const MARKET_DEFINITIONS: {
  [key: string]: MarketDefinition;
} = {
  "Main Protocol": {
    tokens: [S, USDCE, scUSD, wETH],
    POOL_ADDRESS_PROVIDER: "0x24835e3Da1B402f8037e3ce6dE4a701677fa1b54",
    AAVE_POOL: "0xaa1C02a83362BcE106dFf6eB65282fE8B97A1665",
    NATIVE_TOKEN_GATEWAY: "0xbE0B2230B842be6A37188038a58755534dC9E999",
    chainID: sonic.id,
  },
};

export const DEFAULT_MARKET_ID = "Main Protocol";

export const HEALTHBAR_COLORS = [
  {
    name: "Liquidation",
    bg: "bg-black",
    text: "text-black",
    min: -Infinity,
    max: 1,
  },
  {
    name: "red",
    bg: "bg-red-500",
    text: "text-red-500",
    min: 1,
    max: 1.1,
  },
  {
    name: "orange",
    bg: "bg-orange-500",
    text: "text-orange-500",
    min: 1.1,
    max: 1.2,
  },
  {
    name: "yellow",
    bg: "bg-yellow-500",
    text: "text-yellow-500",
    min: 1.2,
    max: 1.4,
  },
  {
    name: "green",
    bg: "bg-green-500",
    text: "text-green-500",
    min: 1.4,
    max: Infinity,
  },
];

export const healthData = (health: number) =>
  HEALTHBAR_COLORS.find(({ min, max }) => health > min && health <= max) || {
    name: "",
    bg: "",
    text: "",
    min: 0,
    max: 0,
  };
