import { useAccount } from "wagmi";
import { useCorrectChain } from "@/hooks";
import { useCallback } from "react";

const useWrapContractAction = (write: (() => void) | undefined) => {
  const { isConnected } = useAccount();
  const { isCorrectChain, switchChain, chainIdToUse } = useCorrectChain();
  const callMethod = useCallback(() => {
    if (!isConnected) {
      return;
    } else if (!isCorrectChain) {
      switchChain?.({ chainId: chainIdToUse });
      return;
    } else {
      write?.();
    }
  }, [isConnected, isCorrectChain, switchChain, chainIdToUse, write]);
  return callMethod;
};

export { useWrapContractAction };
