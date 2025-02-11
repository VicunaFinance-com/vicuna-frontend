import { useEffect, useState } from "react";
import {
  useCorrectChain,
  useInvalidate,
  useSelectedMarket,
  useMarketRaw,
  useUserAccountData,
  useUserData,
  useUserDisplayData,
  useWithdrawToast,
} from "@/hooks";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  AavePoolAbi,
  Addresses,
  NativeTokenGatewayAbi,
  VariableDebtTokenAbi,
} from "@/constants";
import {
  extractError,
  isAddressValid,
  minBn,
  strToBn,
  trimmedString,
} from "@/helpers";
import { Token } from "@/types";

const useWithdraw = (token: Token) => {
  const [amount, setAmount] = useState("");
  const { userData } = useUserData(token.address);
  const { userAccountData } = useUserAccountData();
  const borrowAmountUSD = userAccountData.availableBorrowsBase || BigInt(0);
  const { marketData } = useMarketRaw(token);
  const { marketDefinition } = useSelectedMarket();
  const { invalidateMarketState } = useInvalidate(token);

  const price = marketData?.priceInMarketReferenceCurrency || BigInt(1);
  const scale = marketData?.baseLTVasCollateral || BigInt(10000);
  const abalance = userData?.scaledATokenBalance || BigInt(0);

  const maxWithdraw = minBn(
    abalance,
    (((((borrowAmountUSD * BigInt(10 ** token.decimals)) / price) *
      BigInt(10000)) /
      scale) *
      BigInt(999999)) /
      BigInt(1000000),
    marketData?.availableLiquidity
  );

  const { chainIdToUse } = useCorrectChain();
  const { address: userAddress } = useAccount();
  const isNativeToken =
    token.address === Addresses[chainIdToUse].TOKENS.NATIVE_TOKEN;

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

  const {
    writeContract: writeContractNativeApprove,
    reset: resetNativeApprove,
    data: hashNativeApprove,
    isPending: isNativePending,
    isSuccess: isNativeSuccess,
  } = useWriteContract();

  const { isSuccess: isNativeConfirmed } = useWaitForTransactionReceipt({
    hash: hashNativeApprove,
  });

  const isValidAddress = userAddress && isAddressValid(userAddress);

  let withdraw = () => {
    if (!isValidAddress) return;
    const amountBn = strToBn(amount, token.decimals);
    writeContract(
      {
        abi: AavePoolAbi,
        address: marketDefinition.AAVE_POOL,
        functionName: "withdraw",
        args: [token.address, amountBn, userAddress],
        chainId: chainIdToUse,
      },
      {
        onSuccess: (data) => pendingWithdrawToast(data),
      }
    );
  };
  if (isNativeToken) {
    withdraw = () => {
      if (!isValidAddress) return;
      let amountBn = strToBn(amount, token.decimals);
      writeContractNativeApprove({
        abi: VariableDebtTokenAbi,
        address: marketData?.aTokenAddress || "0x0",
        functionName: "approve",
        args: [marketDefinition.NATIVE_TOKEN_GATEWAY, amountBn],
        chainId: chainIdToUse,
      });
    };
  }

  const { pendingWithdrawToast, successWithdrawToast, errorWithdrawToast } =
    useWithdrawToast({
      token,
      amount: trimmedString(amount, 2),
    });

  useEffect(() => {
    if (isError) {
      console.log(error);
      errorWithdrawToast(hash!, extractError(error?.message));
    }
  }, [isError, error]);

  useEffect(() => {
    if (isNativeConfirmed) {
      resetNativeApprove();
      if (!isValidAddress) return;
      const amountBn = strToBn(amount, token.decimals);
      writeContract({
        abi: NativeTokenGatewayAbi,
        address: marketDefinition.NATIVE_TOKEN_GATEWAY,
        functionName: "withdrawETH",
        args: [userAddress, amountBn, userAddress],
        chainId: chainIdToUse,
      });
    }
  }, [isNativeConfirmed, resetNativeApprove, isValidAddress]);

  useEffect(() => {
    if (isConfirmed) {
      successWithdrawToast(hash!);
      setTimeout(() => {
        reset();
        invalidateMarketState();
        setAmount("");
      }, 500);
    }
  }, [isConfirmed, reset, hash, invalidateMarketState]);

  const displayData = useUserDisplayData(token, "withdraw", amount);

  return {
    amount,
    setAmount,
    balance: maxWithdraw,
    withdraw,
    isPending: isPending || isNativePending || isNativeSuccess,
    isConfirming,
    isConfirmed,
    displayData,
  };
};

export { useWithdraw };
