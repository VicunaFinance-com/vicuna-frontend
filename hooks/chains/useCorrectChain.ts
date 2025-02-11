import { useAccount, useSwitchChain } from "wagmi";
import { useDefaultChain, useAllowedChains } from ".";
import { useCallback, useMemo } from "react";

const useCorrectChain = () => {
  const { chain } = useAccount();
  const defaultChain = useDefaultChain();
  const allowedChains = useAllowedChains();
  const { switchChain } = useSwitchChain();
  const isCorrectChain = useMemo(
    () => !!allowedChains.find((c) => c.id === chain?.id),
    [allowedChains, chain]
  );
  const chainIdToUse = useMemo(
    () => (isCorrectChain && chain ? chain.id : defaultChain.id),
    [isCorrectChain, chain, defaultChain.id]
  );
  const handleSwitchChain = useCallback(() => {
    switchChain({ chainId: chainIdToUse });
  }, [chainIdToUse, switchChain]);
  return {
    isCorrectChain,
    switchChain,
    handleSwitchChain,
    defaultChain,
    allowedChains,
    usersChain: chain,
    chainIdToUse,
  };
};

export { useCorrectChain };
