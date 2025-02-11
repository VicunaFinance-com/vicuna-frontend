import { FarmData } from "@/types/farm";

export const socialLinks = [
  {
    imageSrc: "/icons/social/twitter.png",
    url: "https://twitter.com/VicunaFinance",
  },
  {
    imageSrc: "/icons/social/medium.png",
    url: "https://medium.com/@vicunafinance",
  },
  {
    imageSrc: "/icons/social/github.png",
    url: "https://github.com/VicunaFinance-com",
  },
  {
    imageSrc: "/icons/social/discord.png",
    url: "https://discord.com/invite/vicuna",
  },
  {
    imageSrc: "/icons/social/dune.png",
    url: "https://dune.com/vicunafinance",
  },
  {
    imageSrc: "/icons/social/docs.png",
    url: "https://vicuna-finance.gitbook.io/vicuna-finance-sonic",
  },
  // {
  //   imageSrc: "/icons/social/telegram.png",
  //   url: "",
  // },
];

export const navLinks = [
  {
    label: "Borrow/Lend",
    href: "/markets",
  },
  {
    label: "Farms",
    href: "/farms",
  },
  {
    label: "Vaults",
    href: "/vaults",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    label: "Governance",
    href: "/governance",
  },
  {
    label: "Presale",
    href: "/presale",
  },
];

export const portfolioData = [
  {
    title: "Deposited Collateral",
    value: "$3,000.00",
  },
  {
    title: "Borrowed Funds",
    value: "$1,521.93",
  },
  {
    title: "Net Value",
    value: "$2,478.07",
  },
  {
    title: "Fees and Interest",
    value: "$27.33",
  },
];

export const chainIcons = [
  "/icons/coins/ethereum.png",
  "/icons/coins/arbitrum one.png",
  "/icons/coins/op mainnet.png",
  "/icons/coins/polygon.png",
  "/icons/coins/base.png",
  "/icons/coins/bnb smart chain.png",
  "/icons/coins/sonic.svg",
  "/icons/coins/fantom.png",
];

export const projectData = [
  {
    name: "Shadow",
    icon: "/icons/projects/shadow.png",
  },
  {
    name: "Beethoven",
    icon: "/icons/projects/beethovenX.svg",
  },
  {
    name: "Equalizer",
    icon: "/icons/projects/equalizer.svg",
  },
  {
    name: "SwapX",
    icon: "/icons/projects/swapX.svg",
  },
];

// export const vaultData: VaultData[] = [
//   {
//     vaultName: "ETH-USDC",
//     vaultAddress: "0xe4776c7e51b7cB7E3240426Ef00Af5b55aE374d4",
//     vaultTVL: 3180000,
//     vaultDexTVL: 110300000,
//     vBoost: true,
//     wallets: 0,
//     deposited: 0,
//     apy: 19.6,
//     daily: 0.05,
//     imageSrc2: "/icons/coins/ethereum.png",
//     imageSrc1: "/icons/coins/usdc.png",
//   },
//   {
//     vaultName: "wstETH-ETH",
//     vaultAddress: "0xe4776c7e51b7cB7E3240426Ef00Af5b55aE374d4",
//     vaultTVL: 345140,
//     vaultDexTVL: 10900000,
//     vBoost: false,
//     wallets: 0,
//     deposited: 0,
//     apy: 11.0,
//     daily: 0.03,
//     imageSrc1: "/icons/coins/ethereum.png",
//     imageSrc2: "/icons/coins/wsteth.png",
//   },
//   {
//     vaultName: "ARB-ETH",
//     vaultAddress: "0xe4776c7e51b7cB7E3240426Ef00Af5b55aE374d4",
//     vaultTVL: 521180,
//     vaultDexTVL: 8400000,
//     vBoost: false,
//     wallets: 0,
//     deposited: 1,
//     apy: 14.5,
//     daily: 0.04,
//     imageSrc1: "/icons/coins/ethereum.png",
//     imageSrc2: "/icons/coins/arbitrum one.png",
//   },
//   {
//     vaultName: "GMX-ETH",
//     vaultAddress: "0xe4776c7e51b7cB7E3240426Ef00Af5b55aE374d4",
//     vaultTVL: 636210,
//     vaultDexTVL: 916530,
//     vBoost: false,
//     wallets: 0,
//     deposited: 0,
//     apy: 117.0,
//     daily: 0.32,
//     imageSrc1: "/icons/coins/ethereum.png",
//     imageSrc2: "/icons/coins/gmx.png",
//   },
//   {
//     vaultName: "wBTC-USDT",
//     vaultAddress: "0xe4776c7e51b7cB7E3240426Ef00Af5b55aE374d4",
//     vaultTVL: 287530,
//     vaultDexTVL: 2170000,
//     vBoost: false,
//     wallets: 0,
//     deposited: 0,
//     apy: 12.5,
//     daily: 0.03,
//     imageSrc2: "/icons/coins/wbtc.png",
//     imageSrc1: "/icons/coins/usdt.png",
//   },
// ];

export const farmsData: FarmData[] = [
  {
    farmName: "ETH-USDC",
    tokenSymbol1: "ETH",
    tokenSymbol2: "USDC",
    farmTVL: 3180000,
    farmDexTVL: 110300000,
    apy: { from: 19.6, to: 19.6 },
    leverage: 2,
    apr: {
      yield_percentage: 17.87,
      token_borrowing_interest: 3.4,
      total_apr: 14.5,
      daily_apr: 0.04,
    },
    trending: true,
    imageSrc1: "/icons/coins/ethereum.png",
    imageSrc2: "/icons/coins/usdc.png",
    chainImageSrc: "/icons/coins/arbitrum one.png",
  },
  {
    farmName: "wstETH-ETH",
    tokenSymbol1: "wstETH",
    tokenSymbol2: "ETH",
    farmTVL: 345140,
    farmDexTVL: 10900000,
    apy: { from: 11.0, to: 13.0 },
    leverage: 2,
    apr: {
      yield_percentage: 52.26,
      token_borrowing_interest: 39.4,
      total_apr: 12.9,
      daily_apr: 0.04,
    },
    imageSrc1: "/icons/coins/wsteth.png",
    imageSrc2: "/icons/coins/ethereum.png",
    chainImageSrc: "/icons/coins/op mainnet.png",
  },
  {
    farmName: "ARB-ETH",
    tokenSymbol1: "ARB",
    tokenSymbol2: "ETH",
    farmTVL: 521180,
    farmDexTVL: 8400000,
    apy: { from: 14.5, to: 23.3 },
    leverage: 2,
    apr: {
      yield_percentage: 40.7,
      token_borrowing_interest: 19.3,
      total_apr: 21.4,
      daily_apr: 0.06,
    },
    imageSrc1: "/icons/coins/arbitrum one.png",
    imageSrc2: "/icons/coins/ethereum.png",
    chainImageSrc: "/icons/coins/op mainnet.png",
  },
  {
    farmName: "GMX-ETH",
    tokenSymbol1: "GMX",
    tokenSymbol2: "ETH",
    farmTVL: 636210,
    farmDexTVL: 916530,
    apy: { from: 117, to: 214.2 },
    leverage: 2,
    trending: true,
    apr: {
      yield_percentage: 155.3,
      token_borrowing_interest: 18.2,
      total_apr: 137.1,
      daily_apr: 0.38,
    },
    imageSrc1: "/icons/coins/gmx.png",
    imageSrc2: "/icons/coins/ethereum.png",
    chainImageSrc: "/icons/coins/arbitrum one.png",
  },
  {
    farmName: "wBTC-USDT",
    tokenSymbol1: "wBTC",
    tokenSymbol2: "USDT",
    farmTVL: 287530,
    farmDexTVL: 2170000,
    apy: { from: 12.5, to: 28.1 },
    leverage: 2,
    apr: {
      yield_percentage: 35.4,
      token_borrowing_interest: 9.3,
      total_apr: 26.1,
      daily_apr: 0.07,
    },
    imageSrc2: "/icons/coins/wbtc.png",
    imageSrc1: "/icons/coins/usdt.png",
    chainImageSrc: "/icons/coins/arbitrum one.png",
  },
];

export const presaleTokenAddr = {
  Base_USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  Base_USDT: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
  Fantom_axUSDC: "0x1B6382DBDEa11d97f24495C9A90b7c88469134a4",
  Fantom_lzUSDC: "0x28a92dde19D9989F39A49905d7C9C2FAc7799bDf",
  Arb_USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  Arb_USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
};

export const contractAddress = {
  Base: "0x5C7B3155F079BEac6B2854c1992EdCAFb8b30D4d",
  Fantom: "0xFC8F6320eFECa5232706a25d069d8159c65e3969",
  Arbitrum: "0xe787F3040FAE5B473055A9AA902Acd267b3F43D9",
};

export const RPC_URLS = {
  base: "https://base-rpc.publicnode.com", // Replace with actual Base RPC URL
  arbitrumone: "https://arbitrum-one-rpc.publicnode.com", // Replace with actual Arbitrum RPC URL
  fantom: "https://fantom-rpc.publicnode.com", // Replace with actual Fantom RPC URL
  // sonic: "https://rpc.soniclabs.com"
};

export const USDC_ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_upgradedAddress", type: "address" }],
    name: "deprecate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "deprecated",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_evilUser", type: "address" }],
    name: "addBlackList",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "upgradedAddress",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balances",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "maximumFee",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "unpause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_maker", type: "address" }],
    name: "getBlackListStatus",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    name: "allowed",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "paused",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "who", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "pause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "newBasisPoints", type: "uint256" },
      { name: "newMaxFee", type: "uint256" },
    ],
    name: "setParams",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "issue",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "redeem",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "basisPointsRate",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "isBlackListed",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_clearedUser", type: "address" }],
    name: "removeBlackList",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MAX_UINT",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_blackListedUser", type: "address" }],
    name: "destroyBlackFunds",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "_initialSupply", type: "uint256" },
      { name: "_name", type: "string" },
      { name: "_symbol", type: "string" },
      { name: "_decimals", type: "uint256" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "Issue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "Redeem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "newAddress", type: "address" }],
    name: "Deprecate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "feeBasisPoints", type: "uint256" },
      { indexed: false, name: "maxFee", type: "uint256" },
    ],
    name: "Params",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_blackListedUser", type: "address" },
      { indexed: false, name: "_balance", type: "uint256" },
    ],
    name: "DestroyedBlackFunds",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "_user", type: "address" }],
    name: "AddedBlackList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "_user", type: "address" }],
    name: "RemovedBlackList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "Pause", type: "event" },
  { anonymous: false, inputs: [], name: "Unpause", type: "event" },
];

export const HARDCAP = {
  Fantom: 300000,
  Arbitrum: 150000,
  Base: 150000,
};

export const PresaleContractABIBase = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "depositedAmount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
    ],
    name: "PresaleStatus",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addedAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "isWhitelisted",
        type: "bool",
      },
    ],
    name: "UpdateWhiteList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "CoinAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "USDC_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDT_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "WhiteList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hardCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "multiSigWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "preSaleStatus",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_buyerOption",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_period",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_selfReferralCode",
        type: "string",
      },
      {
        internalType: "string",
        name: "_friendReferralCode",
        type: "string",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_addresses",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "batchUpdateWhiteList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_status",
        type: "uint256",
      },
    ],
    name: "setPresaleStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getInvestorIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getInvestorInfoById",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "buyerOption",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "period",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "selfReferralCode",
            type: "string",
          },
          {
            internalType: "string",
            name: "friendReferralCode",
            type: "string",
          },
        ],
        internalType: "struct TokenPresaleBaseChain.InvestorInfoType",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getInvestorInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "buyerOption",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "period",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "selfReferralCode",
            type: "string",
          },
          {
            internalType: "string",
            name: "friendReferralCode",
            type: "string",
          },
        ],
        internalType: "struct TokenPresaleBaseChain.InvestorInfoType[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const PresaleContractABIArbitrum = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "depositedAmount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
    ],
    name: "PresaleStatus",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addedAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "isWhitelisted",
        type: "bool",
      },
    ],
    name: "UpdateWhiteList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "CoinAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "USDC_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDT_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "WhiteList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hardCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "multiSigWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "preSaleStatus",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_buyerOption",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_period",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_selfReferralCode",
        type: "string",
      },
      {
        internalType: "string",
        name: "_friendReferralCode",
        type: "string",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_addresses",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "batchUpdateWhiteList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_status",
        type: "uint256",
      },
    ],
    name: "setPresaleStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getInvestorIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getInvestorInfoById",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "buyerOption",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "period",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "selfReferralCode",
            type: "string",
          },
          {
            internalType: "string",
            name: "friendReferralCode",
            type: "string",
          },
        ],
        internalType: "struct TokenPresaleArbitrum.InvestorInfoType",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getInvestorInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "buyerOption",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "period",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "selfReferralCode",
            type: "string",
          },
          {
            internalType: "string",
            name: "friendReferralCode",
            type: "string",
          },
        ],
        internalType: "struct TokenPresaleArbitrum.InvestorInfoType[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const PresaleContractAPIFantom = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "depositedAmount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
    ],
    name: "PresaleStatus",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addedAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "isWhitelisted",
        type: "bool",
      },
    ],
    name: "UpdateWhiteList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "CoinAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "WhiteList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "axlUSDC_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "hardCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "lzUSDC_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "multiSigWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "preSaleStatus",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_buyerOption",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_period",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_selfReferralCode",
        type: "string",
      },
      {
        internalType: "string",
        name: "_friendReferralCode",
        type: "string",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_addresses",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "batchUpdateWhiteList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_status",
        type: "uint256",
      },
    ],
    name: "setPresaleStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getInvestorIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getInvestorInfoById",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "buyerOption",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "period",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "selfReferralCode",
            type: "string",
          },
          {
            internalType: "string",
            name: "friendReferralCode",
            type: "string",
          },
        ],
        internalType: "struct TokenPresaleFantom.InvestorInfoType",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getInvestorInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "buyerOption",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "period",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "selfReferralCode",
            type: "string",
          },
          {
            internalType: "string",
            name: "friendReferralCode",
            type: "string",
          },
        ],
        internalType: "struct TokenPresaleFantom.InvestorInfoType[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export const PresaleBonus = {
  0: 17.6,
  7: [15, 11.25],
  12: [35, 26.25],
  18: [60, 45],
  24: [100, 75],
};
