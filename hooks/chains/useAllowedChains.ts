import { useMemo } from "react";
import { PROTOCOL_CHAINS } from "@/constants";

const useAllowedChains = () => {
  return useMemo(() => {
    return PROTOCOL_CHAINS;
  }, []);
};

export { useAllowedChains };
