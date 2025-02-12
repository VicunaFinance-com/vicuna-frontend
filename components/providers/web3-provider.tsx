"use client";
import { useState, useEffect } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { defineChain } from "viem";

const sonic = /*#__PURE__*/ defineChain({
  id: 146,
  name: "Sonic",
  nativeCurrency: {
    decimals: 18,
    name: "Sonic",
    symbol: "S",
  },
  rpcUrls: {
    default: { http: ["https://rpc.soniclabs.com"] },
  },
  blockExplorers: {
    default: {
      name: "Sonic Explorer",
      url: "https://explorer.soniclabs.com/",
    },
  },
  testnet: false,
});

const config = createConfig(
  getDefaultConfig({
    chains: [sonic],
    transports: {
      [sonic.id]: http("https://rpc.soniclabs.com"),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required App Info
    appName: "Vicuna Finance",
  })
);
export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [hydrate, setHydrate] = useState(false);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: true,
            staleTime: 60 * 1000,
          },
        },
      })
  );

  useEffect(() => {
    setHydrate(true);
  }, []);

  return (
    <>
      {hydrate && (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>{children}</ConnectKitProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </WagmiProvider>
      )}
    </>
  );
};
