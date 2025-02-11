import { useEffect, useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Address, erc20Abi } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { queryKeys } from "@/queries";
import {
  useCorrectChain,
  useWrapContractAction,
  useApproveToast,
  useAllowance,
} from "@/hooks";
import { getTokenByAddress } from "@/constants";
import { extractError, MAXUINT256, trimmedBn, isAddressValid } from "@/helpers";
const useApproveToken = (spenderAddress: Address, tokenAddress: Address) => {
  const { chainIdToUse: chainId } = useCorrectChain();
  const { address: approverAddress } = useAccount();
  const { invalidateAllowanceQuery } = useAllowance(
    spenderAddress,
    tokenAddress
  );

  const isValidAddress =
    isAddressValid(approverAddress) &&
    isAddressValid(spenderAddress) &&
    isAddressValid(tokenAddress);

  const [approveAmount, setApproveAmount] = useState<bigint>(MAXUINT256);

  const { data: hash, isPending, writeContract, reset } = useWriteContract();
  const token = getTokenByAddress(tokenAddress);
  const { pendingApproveToast, successApproveToast, errorApproveToast } =
    useApproveToast({
      token: token!,
      amount: trimmedBn(approveAmount, token?.decimals || 0, 2),
    });
  const write = () => {
    if (!isValidAddress) return;
    writeContract(
      {
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "approve",
        args: [spenderAddress, approveAmount],
        chainId,
      },
      {
        onSuccess: (data) => {
          pendingApproveToast(data);
        },
        onError: (error) => {
          console.log("Approve Token Error", error);
        },
      }
    );
  };
  const approve = useWrapContractAction(write);

  const {
    isLoading: isApproveConfirming,
    isSuccess,
    isError,
    error,
  } = useWaitForTransactionReceipt({
    hash,
    confirmations: 2,
  });
  useEffect(() => {
    if (isSuccess || isError) {
      if (isSuccess) {
        invalidateAllowanceQuery();
        successApproveToast(hash!);
      }
      if (isError) {
        errorApproveToast(hash!, extractError(error?.message));
      }
      reset();
    }
  }, [isSuccess, isError, reset, invalidateAllowanceQuery]);

  return {
    invalidateAllowanceQuery,
    approve,
    approveAmount,
    setApproveAmount,
    isApprovePending: isPending,
    isApproveConfirming,
  };
};

export { useApproveToken };
