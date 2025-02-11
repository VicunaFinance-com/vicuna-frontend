import { Chain, createPublicClient, http, PublicClient } from "viem";
import { sonic } from "viem/chains";

const SonicClient = createPublicClient({
  chain: sonic,
  transport: http("https://rpc.soniclabs.com"),
});

export const ClientMap: Record<Chain["id"], PublicClient> = {
  [sonic.id]: SonicClient,
};
