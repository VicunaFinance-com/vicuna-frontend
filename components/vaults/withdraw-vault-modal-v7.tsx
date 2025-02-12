"use client";

import { Config, useAccount } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VaultData } from "@/types/vault";

import { VaultInput } from "@/components/ui/vaultInput";
import { Badge } from "@/components/ui/badge";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { PercentageBar } from "@/components/ui/percentage-bar";
import { DoubleAvatar } from "@/components/ui/double-avatar";
import { Withdraw } from "@/components/icons/withdraw";

import { useWriteContract } from "wagmi";
import Decimal from "decimal.js";

import { config } from "@/lib/config";
import { useEffect, useState, useRef } from "react";
import { Address, formatEther, parseEther } from "viem";

import BeefyVaultV7 from "@/config/BeefyVaultV7.json";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { ExternalLinkIcon } from "lucide-react";
import { useNetworkSwitch } from "@/hooks/useNetworkSwitch";
import { setBalance } from "viem/actions";

interface WithdrawVaultModalV7Props {
  vault: VaultData;
  lps?: number;
  children?: React.ReactNode;
  onApprove?: () => void;
}

export const WithdrawVaultModalV7 = ({
  vault,
  lps,
  children,
  onApprove,
}: WithdrawVaultModalV7Props) => {
  Decimal.set({ precision: 50 });

  const { address } = useAccount();
  const [availableBalance, setAvailableBalance] = useState<string>("0");
  const { writeContractAsync } = useWriteContract();

  const [amount, setAmount] = useState<string>("0");

  const [percentage, setPercentage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const [isAmountValid, setIsAmountValid] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [calculatedShares, setCalculatedShares] = useState<string | null>(null);
  const [calculatedSharesUSD, setCalculatedSharesUSD] = useState<string | null>(
    null
  );
  const { isSwitching, isWrongChain, switchToSonicMainnet } =
    useNetworkSwitch();

  const [inputSource, setInputSource] = useState<"input" | "slider">("input");

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);

      const result = await writeContractAsync({
        abi: BeefyVaultV7.abi,
        address: vault.vaultAddress as Address,
        functionName: "withdraw",
        args: [parseEther(amount.toString())],
      });

      if (!result) {
        throw new Error("Transaction hash is null or undefined");
      }

      setTransactionHash(result);
      const receipt = await waitForTransactionReceipt(config as Config, {
        hash: result as `0x${string}`,
      });

      setRefreshKey((prevKey) => prevKey + 1);

      // Callback function
      if (onApprove) {
        onApprove();
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error executing withdraw:", error);
    }
  };

  const checkBalance = async () => {
    try {
      if (!address || address == undefined) {
        console.error("Invalid user address");
        setAvailableBalance("0");
        return;
      }

      const balance = await readContract(config as Config, {
        abi: BeefyVaultV7.abi,
        address: vault.vaultAddress as Address,
        functionName: "balanceOf",
        args: [address as Address],
      });

      // setAvailableBalance(formatEther(balance as bigint));
      formatAvailableBalance(formatEther(balance as bigint));

      return balance;
    } catch (err) {
      console.error(
        `Error fetching v7 balance for ${vault.vaultAddress}:`,
        err
      );
      setAvailableBalance("0");
    }
  };

  const handlePricePerShare = async () => {
    try {
      const vaultPrice = (await readContract(config as Config, {
        abi: BeefyVaultV7.abi,
        address: vault.vaultAddress as Address,
        functionName: "getPricePerFullShare",
      })) as bigint;

      const shares = parseFloat(amount) * parseFloat(formatEther(vaultPrice));
      setCalculatedShares(shares.toFixed(16).replace(/\.?0+$/, ""));

      if (lps) {
        setCalculatedSharesUSD((shares * lps).toFixed(2).replace(/\.?0+$/, ""));
      } else {
        setCalculatedSharesUSD("-");
      }
    } catch (err) {
      console.error("Error fetching price per share:", err);
    }
  };

  const handleAvailableDisplay = () => {
    const [integerPart, fractionalPart] = availableBalance.split(".");
    const truncatedFractionalPart = fractionalPart
      ? fractionalPart.slice(0, 10)
      : "";
    const truncatedAmount = `${integerPart}.${truncatedFractionalPart}`;
    return truncatedAmount.replace(/\.?0+$/, "").replace(/\.$/, "");
  };

  const formatAvailableBalance = (availableTemp: string) => {
    const [integerPart, fractionalPart] = availableTemp.split(".");
    const truncatedFractionalPart = fractionalPart
      ? fractionalPart.slice(0, 10)
      : "";
    const truncatedAmount = `${integerPart}.${truncatedFractionalPart}`;

    setAvailableBalance(
      truncatedAmount.replace(/\.?0+$/, "").replace(/\.$/, "")
    );
  };

  const handleSetup = async () => {
    setAmount("0");
    setPercentage(0);
    // setTransactionHash(null);
    setIsLoading(false);
    checkBalance();
  };

  const handleShareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputSource("input");

    const regex = /^\d*\.?\d{0,10}$/;

    if (value == "") {
      setPercentage(0);
    }

    if (regex.test(value)) {
      setAmount(value);
    }
  };

  useEffect(() => {
    if (inputSource === "slider") {
      const availableAmount = new Decimal(availableBalance);
      const percentageDecimal = new Decimal(percentage);
      const newAmount = availableAmount.mul(percentageDecimal.div(100));

      const truncatedAmount = newAmount.toDecimalPlaces(10);
      const formattedAmount = truncatedAmount.toFixed(10).replace(/\.?0+$/, "");

      setAmount(formattedAmount);
    }
  }, [percentage]);

  useEffect(() => {
    if (amount) {
      const availableAmount = new Decimal(availableBalance);
      const amountDecimal = new Decimal(amount);
      const newPercentage = amountDecimal.div(availableAmount).mul(100);

      if (!isNaN(newPercentage.toNumber())) {
        setPercentage(Math.min(Math.max(newPercentage.toNumber(), 0), 100));
      }
    } else {
      setPercentage(0);
    }
  }, [amount]);

  useEffect(() => {
    const validateShare = () => {
      try {
        const parsedAmount0 = Number(amount);

        const parsedAvailableBalance0 = Number(availableBalance);

        if (parsedAmount0 <= 0 || parsedAmount0 > parsedAvailableBalance0) {
          setIsAmountValid(false);
        } else {
          setIsAmountValid(true);
        }
      } catch (error) {
        setIsAmountValid(false);
      }
    };

    validateShare();
  }, [amount, availableBalance]);

  useEffect(() => {
    if (amount && !isNaN(Number(amount))) {
      handlePricePerShare();
    }
  }, [amount]);

  useEffect(() => {
    handleSetup();
  }, [refreshKey]);

  function formatAmount(value: bigint): string {
    const etherValue = Number(value) / 10 ** 18;

    const formatted = etherValue.toFixed(10);

    return formatted.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  }

  return (
    <Dialog>
      <DialogTrigger>
        {children ? (
          children
        ) : (
          <Button onClick={() => handleSetup()}>Withdraw</Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-card text-primary">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-6 pb-10">
            <DoubleAvatar
              firstSrc={vault?.imageSrc1!}
              secondSrc={vault?.imageSrc0!}
              firstAlt={vault?.name!}
              secondAlt={vault?.name!}
            />{" "}
            Withdraw from {vault?.name} Vault
          </DialogTitle>

          <DialogDescription className="flex flex-col gap-8 text-primary">
            {/* <div className="flex items-center justify-between">
              <span className="font-semibold">Withdraw</span>
              <span className="flex items-center gap-2 font-semibold">
                Break Liquidity{" "}
                <ExternalLinkIcon className="w-4 h-4 text-primary" />
              </span>
            </div> */}

            <div className="mt-4">
              <span className="font-semibold">
                Available: {handleAvailableDisplay()}
              </span>
              <div
                className={`relative flex items-center bg-primary rounded-2xl px-3 py-2 w-full ${
                  isFocused
                    ? "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                    : ""
                }`}
                onClick={() => {
                  inputRef.current?.focus();
                  setIsFocused(true);
                }}
              >
                <Button
                  size="sm"
                  className="absolute left-2 h-6 z-10 bg-purple-200 text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAmount(handleAvailableDisplay());
                  }}
                >
                  MAX
                </Button>
                <VaultInput
                  ref={inputRef}
                  className="bg-primary placeholder:text-accent text-right text-accent pl-16 pr-[0.5rem] h-full"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleShareChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <div className="flex items-center w-max ml-2">
                  <Badge
                    variant="accent"
                    className="rounded-lg flex items-center gap-2 px-2 py-1 whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DoubleAvatar
                      firstSrc={vault?.imageSrc1!}
                      secondSrc={vault?.imageSrc0!}
                      firstAlt={vault?.name!}
                      secondAlt={vault?.name!}
                      size="small"
                    />
                    {vault?.token0Name}-{vault?.token1Name}
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <PercentageBar
                  percentage={percentage}
                  onChange={(newPercentage) => {
                    setPercentage(newPercentage);
                    setInputSource("slider");
                  }}
                />
              </div>
            </div>

            {Number(amount) > 0 && (
              <div className="flex flex-col gap-2 border border-background text-xs rounded-2xl p-4">
                <p className="font-bold">You Withdraw</p>
                <div className="flex gap-2">
                  <div className="flex items-center justify-between w-full p-2 border border-background rounded">
                    <Badge
                      variant="accent"
                      className="rounded-lg flex items-center gap-2 px-1"
                    >
                      <DoubleAvatar
                        firstSrc={vault?.imageSrc1!}
                        secondSrc={vault?.imageSrc0!}
                        firstAlt={vault?.name!}
                        secondAlt={vault?.name!}
                        size={"small"}
                      />
                      {vault?.token0Name}-{vault?.token1Name}
                    </Badge>

                    <div className="flex flex-col">
                      <span>{calculatedShares}</span>
                      <span>${calculatedSharesUSD}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isWrongChain && (
              <Button
                className="flex items-center gap-2"
                onClick={() => {
                  handleWithdraw();
                }}
                disabled={isLoading || !isAmountValid}
              >
                <Withdraw className="w-5 h-5" /> Withdraw
              </Button>
            )}

            {isWrongChain && (
              <Button
                className=""
                onClick={switchToSonicMainnet}
                disabled={isSwitching}
              >
                {isSwitching ? "Switching..." : "Switch to Sonic"}
              </Button>
            )}

            {transactionHash && isLoading && (
              <p className="mx-auto font-bold">
                Waiting for transaction to be confirmed...
              </p>
            )}
            {transactionHash && !isLoading && (
              <a
                href={`https://explorer.soniclabs.com/tx/${transactionHash}`}
                target="_blank"
                className="mx-auto font-bold flex gap-2 items-center"
              >
                Transaction confirmed!{" "}
                <ExternalLinkIcon className="w-4 h-4 text-primary" />
              </a>
            )}

            <div className="flex flex-col gap-2 border border-background text-xs rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  Deposit Fee{" "}
                  <InfoTooltip>
                    The fee is deducted from the deposit amount and added to the
                    vault.
                  </InfoTooltip>{" "}
                </span>
                <span>0%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  Withdrawal Fee
                  <InfoTooltip>
                    The fee is deducted from the withdrawal amount and added to
                    the vault.
                  </InfoTooltip>
                </span>
                <span>0%</span>
              </div>
              <p className="text-xs">
                The displayed APY accounts for performance fee{" "}
                <InfoTooltip>
                  The fee is deducted from the withdrawal amount and added to
                  the vault.
                </InfoTooltip>{" "}
                that is deducted from the generated yield only.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
