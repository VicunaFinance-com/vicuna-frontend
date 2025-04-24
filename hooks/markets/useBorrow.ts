import { useEffect, useState } from "react";
import {
  useCorrectChain,
  useBorrowToast,
  useUserAccountData,
  useMarketRaw,
  useUserDisplayData,
  useInvalidate,
  useUserData,
} from "@/hooks";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  AavePoolAbi,
  MARKET_DEFINITIONS,
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
import { Token } from "@/constants";

const useBorrow = (marketID: string, token: Token) => {
  const [amount, setAmount] = useState("");
  const { userAccountData } = useUserAccountData(marketID);
  const borrowAmountUSD = userAccountData.availableBorrowsBase;
  const { marketData } = useMarketRaw(marketID, token);
  const { userData } = useUserData(marketID, token);
  const marketDefinition = MARKET_DEFINITIONS[marketID];
  const { invalidateMarketState } = useInvalidate(marketID, token);
  const price = marketData?.priceInMarketReferenceCurrency;
  const borrowCap = marketData?.borrowCap || BigInt(0);
  const variableDebt = userData?.variableDebt || BigInt(0);
  const availableLiquidity = marketData?.availableLiquidity || BigInt(0);
  let maxBorrow =
    borrowAmountUSD && price
      ? (((borrowAmountUSD * BigInt(10 ** token.decimals)) / price) *
          BigInt(999999)) /
        BigInt(1000000)
      : BigInt(0);

  // let maxBorrow = minBn(
  //   borrowAmountUSD && price
  //     ? (((borrowAmountUSD * BigInt(10 ** token.decimals)) / price) *
  //         BigInt(999999)) /
  //         BigInt(1000000)
  //     : BigInt(0),
  //   borrowCap * BigInt(10 ** token.decimals) - variableDebt,
  //   (availableLiquidity * BigInt(10 ** 10 - 1)) / BigInt(10 ** 10)
  // );

  const { chainIdToUse } = useCorrectChain();
  const { address: userAddress } = useAccount();

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

  let borrow = () => {
    if (!isValidAddress) return;
    const amountBn = strToBn(amount, token.decimals);
    writeContract(
      {
        abi: AavePoolAbi,
        address: marketDefinition.AAVE_POOL,
        functionName: "borrow",
        args: [token.address, amountBn, BigInt(2), 0, userAddress],
        chainId: chainIdToUse,
      },
      {
        onSuccess: (data) => {
          pendingBorrowToast(data);
        },
      }
    );
  };
  if (token.isNative) {
    borrow = () => {
      if (!isValidAddress) return;
      const amountBn = strToBn(amount, token.decimals);
      writeContractNativeApprove({
        abi: VariableDebtTokenAbi,
        address: marketData?.variableDebtTokenAddress || "0x0",
        functionName: "approveDelegation",
        args: [marketDefinition.NATIVE_TOKEN_GATEWAY, amountBn],
        chainId: chainIdToUse,
      });
    };
  }

  const { pendingBorrowToast, successBorrowToast, errorBorrowToast } =
    useBorrowToast({
      token,
      amount: trimmedString(amount, 2),
    });

  useEffect(() => {
    if (isError) {
      console.log(error);
      errorBorrowToast(hash!, extractError(error?.message));
    }
  }, [isError, error]);

  useEffect(() => {
    if (isNativeConfirmed) {
      resetNativeApprove();
      if (!isValidAddress) return;
      const amountBn = strToBn(amount, token.decimals);
      writeContract(
        {
          abi: NativeTokenGatewayAbi,
          address: marketDefinition.NATIVE_TOKEN_GATEWAY,
          functionName: "borrowETH",
          args: [userAddress, amountBn, BigInt(2), 0],
          chainId: chainIdToUse,
        },
        {
          onSuccess: (data) => {
            pendingBorrowToast(data);
          },
        }
      );
    }
  }, [isNativeConfirmed, resetNativeApprove, isValidAddress]);

  useEffect(() => {
    if (isConfirmed) {
      successBorrowToast(hash!);
      setTimeout(() => {
        reset();
        invalidateMarketState();
        setAmount("");
      }, 500);
    }
  }, [isConfirmed, reset, hash, invalidateMarketState]);

  const displayData = useUserDisplayData(marketID, token, "borrow", amount);

  return {
    amount,
    setAmount,
    maxBorrow,
    borrow,
    isPending: isPending || isNativePending || isNativeSuccess,
    isConfirming,
    isConfirmed,
    displayData,
  };
};

export { useBorrow };
