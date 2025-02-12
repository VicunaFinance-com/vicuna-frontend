import { useEffect, useState } from "react";
import {
  useAllowance,
  useApproveToken,
  useCorrectChain,
  useInvalidate,
  useMarket,
  useSelectedMarket,
  useSupplyToast,
  useTokenBalance,
  useUserDisplayData,
} from "@/hooks";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { AavePoolAbi, Addresses, NativeTokenGatewayAbi } from "@/constants";
import {
  extractError,
  isAddressValid,
  strToBn,
  trimmedString,
} from "@/helpers";
import { Token } from "@/types";

const useSupply = (token: Token) => {
  const [amount, setAmount] = useState("");
  const { balance } = useTokenBalance(token.address);
  const { chainIdToUse } = useCorrectChain();
  const { address: userAddress } = useAccount();
  const { marketBnData } = useMarket(token.address);
  const { marketDefinition } = useSelectedMarket();

  const { allowance } = useAllowance(marketDefinition.AAVE_POOL, token.address);
  const { invalidateMarketState } = useInvalidate(token);
  const isNativeToken =
    token.address.toLowerCase() ===
    Addresses[chainIdToUse].TOKENS.NATIVE_TOKEN.toLowerCase();

  const {
    approve,
    invalidateAllowanceQuery,
    isApproveConfirming,
    isApprovePending,
    setApproveAmount,
  } = useApproveToken(marketDefinition.AAVE_POOL, token.address);

  const {
    writeContract,
    isPending,
    data: hash,
    reset,
    error,
    isError,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const isValidAddress = userAddress && isAddressValid(userAddress);
  const hasEnoughAllowance =
    isNativeToken ||
    (!!allowance &&
      allowance > 0 &&
      allowance >= strToBn(amount, token.decimals));

  let supply = () => {
    if (!isValidAddress) return;
    const amountBn = strToBn(amount, token.decimals);
    writeContract(
      {
        abi: AavePoolAbi,
        address: marketDefinition.AAVE_POOL,
        functionName: "supply",
        args: [token.address, amountBn, userAddress, 0],
        chainId: chainIdToUse,
      },
      {
        onSuccess: (data) => pendingSupplyToast(data),
        onError: (error) => {
          // errorSupplyToast(extractError(error?.message));
        },
      }
    );
  };
  if (isNativeToken) {
    supply = () => {
      if (!isValidAddress) return;
      let amountBn = strToBn(amount, token.decimals);
      if ((balance || BigInt(0)) - amountBn < BigInt(5e16)) {
        amountBn = amountBn - BigInt(5e16);
      }
      writeContract(
        {
          abi: NativeTokenGatewayAbi,
          address: marketDefinition.NATIVE_TOKEN_GATEWAY,
          functionName: "depositETH",
          args: [userAddress, userAddress, 0],
          chainId: chainIdToUse,
          value: amountBn,
        },
        {
          onSuccess: (data) => pendingSupplyToast(data),
          onError: (error) => {
            // errorSupplyToast(extractError(error?.message));
          },
        }
      );
    };
  }
  const { pendingSupplyToast, successSupplyToast, errorSupplyToast } =
    useSupplyToast({
      token,
      amount: trimmedString(amount, 2),
    });

  useEffect(() => {
    if (isError) {
      console.log(error);
      errorSupplyToast(hash!, extractError(error?.message));
    }
  }, [isError, error]);

  useEffect(() => {
    if (amount) {
      setApproveAmount(strToBn(amount, token.decimals));
    }
  }, [amount, setApproveAmount, token.decimals]);

  useEffect(() => {
    if (isConfirmed) {
      successSupplyToast(hash!);
      setTimeout(() => {
        invalidateAllowanceQuery();
        invalidateMarketState();
        reset();
        setAmount("");
      }, 500);
    }
  }, [
    isConfirmed,
    invalidateAllowanceQuery,
    reset,
    hash,
    invalidateMarketState,
  ]);

  const displayData = useUserDisplayData(token, "supply", amount);

  return {
    amount,
    setAmount,
    balance: balance || BigInt(0),
    supplyCap: marketBnData?.supplyCap || BigInt(0),
    hasEnoughAllowance,
    supply,
    approve,
    isPending,
    isApprovePending,
    isConfirming,
    isConfirmed,
    isApproveConfirming,
    displayData,
  };
};

export { useSupply };
