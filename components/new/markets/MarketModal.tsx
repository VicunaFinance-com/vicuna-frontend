"use client";

import React, { useCallback, useEffect } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { useState } from "react";
import Image from "next/image";
import { Deposit } from "@/components/icons/deposit";
import { Withdraw } from "@/components/icons/withdraw";
import { ExternalLinkIcon, RefreshCw } from "lucide-react";
import { MarketInfo } from "@/types";
import {
  useBorrow,
  useMarket,
  useRepay,
  useSearch,
  useSelectedMarket,
  useSupply,
  useWithdraw,
} from "@/hooks";
import { minBn } from "@/helpers";
import { BaseActionForm } from "@/components";
import Link from "next/link";
import { MARKET_DEFINITIONS, Token } from "@/constants";
import { DoubleAvatar } from "@/components/ui/double-avatar";

export interface MarketModalProps {
  token: Token;
  setSelectedToken: (token: Token) => void;
  defaultIsBorrow?: boolean;
  isVisible: boolean;
  onClose?: () => void;
}

interface FormProps {
  token: Token;
  market: MarketInfo;
  marketID: string;
}

const SupplyForm = ({ token, market, marketID }: FormProps) => {
  const {
    amount,
    setAmount,
    balance,
    supplyCap,
    hasEnoughAllowance,
    supply,
    approve,
    isPending,
    isApprovePending,
    isConfirming,
    isApproveConfirming,
    displayData,
  } = useSupply(marketID, token);

  return (
    <BaseActionForm
      token={token}
      market={market}
      title="Supply"
      amount={amount}
      onChangeAmount={setAmount}
      balance={minBn(balance, supplyCap)}
      hasEnoughAllowance={hasEnoughAllowance}
      onAction={supply}
      onApprove={approve}
      isActionPending={isPending || isConfirming}
      isApproving={isApprovePending || isApproveConfirming}
      actionIcon={Deposit}
      displayData={displayData}
      healthBarDefinition={MARKET_DEFINITIONS[marketID].healthBar}
    />
  );
};

const WithdrawForm = ({ token, market, marketID }: FormProps) => {
  const {
    amount,
    setAmount,
    balance,
    withdraw,
    isPending,
    isConfirming,
    displayData,
  } = useWithdraw(marketID, token);

  return (
    <BaseActionForm
      token={token}
      market={market}
      title="Withdraw"
      amount={amount}
      onChangeAmount={setAmount}
      balance={balance}
      hasEnoughAllowance={true}
      onAction={withdraw}
      isActionPending={isPending || isConfirming}
      isApproving={false}
      actionIcon={Withdraw}
      onApprove={() => 0}
      displayData={displayData}
      healthBarDefinition={MARKET_DEFINITIONS[marketID].healthBar}
    />
  );
};

const BorrowForm = ({ token, market, marketID }: FormProps) => {
  const {
    amount,
    setAmount,
    maxBorrow,
    borrow,
    isPending,
    isConfirming,
    displayData,
  } = useBorrow(marketID, token);

  return (
    <BaseActionForm
      token={token}
      market={market}
      title="Borrow"
      amount={amount}
      onChangeAmount={setAmount}
      balance={maxBorrow}
      hasEnoughAllowance={true}
      onAction={borrow}
      isActionPending={isPending || isConfirming}
      isApproving={false}
      actionIcon={Withdraw}
      onApprove={() => 0}
      displayData={displayData}
      healthBarDefinition={MARKET_DEFINITIONS[marketID].healthBar}
    />
  );
};

const RepayForm = ({ token, market, marketID }: FormProps) => {
  const {
    amount,
    setAmount,
    balance,
    maxDebt,
    hasEnoughAllowance,
    repay,
    approve,
    isPending,
    isApprovePending,
    isConfirming,
    isApproveConfirming,
    displayData,
  } = useRepay(marketID, token);

  return (
    <BaseActionForm
      token={token}
      market={market}
      title="Repay"
      amount={amount}
      onChangeAmount={setAmount}
      balance={minBn(balance, maxDebt)}
      hasEnoughAllowance={hasEnoughAllowance}
      onAction={repay}
      onApprove={approve}
      isActionPending={isPending}
      isApproving={false}
      actionIcon={Deposit}
      displayData={displayData}
      healthBarDefinition={MARKET_DEFINITIONS[marketID].healthBar}
    />
  );
};

const StyledTrigger = ({ value }: { value: string }) => (
  <TabsTrigger
    value={value}
    className="w-full text-lg data-[state=active]:bg-background data-[state=active]:text-primary bg-transparent h-12 shadow-none rounded-none border-b-0 border-l-0 border-r-0 border-t-2 border-t-transparent data-[state=inactive]:border-t-background"
  >
    {value.charAt(0).toUpperCase() + value.slice(1)}
  </TabsTrigger>
);

const BorrowTabSelector = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
  <Tabs
    className="w-full h-12 bg-card"
    value={activeTab}
    onValueChange={setActiveTab}
  >
    <TabsList className="grid w-full grid-cols-2 p-0 gap-0">
      <StyledTrigger value="borrow" />
      <StyledTrigger value="repay" />
    </TabsList>
  </Tabs>
);

const SupplyTabSelector = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
  <Tabs
    className="w-full h-12 bg-card"
    value={activeTab}
    onValueChange={setActiveTab}
  >
    <TabsList className="grid w-full grid-cols-2 p-0 gap-0">
      <StyledTrigger value="supply" />
      <StyledTrigger value="withdraw" />
    </TabsList>
  </Tabs>
);

const ActiveTabSelector = ({
  isBorrow,
  activeTab,
  setActiveTab,
}: {
  isBorrow: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) =>
  isBorrow ? (
    <BorrowTabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
  ) : (
    <SupplyTabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
  );

export const MarketModal = ({
  token,
  setSelectedToken,
  defaultIsBorrow = false,
  isVisible,
  onClose,
}: MarketModalProps) => {
  const { marketID } = useSelectedMarket();
  const [isBorrow, setIsBorrow] = useState(defaultIsBorrow);
  const [activeTab, setActiveTab] = useState(
    defaultIsBorrow ? "borrow" : "supply"
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleMode = useCallback(() => {
    setIsBorrow((prev) => !prev);
    setActiveTab((prev) => {
      if (prev === "supply") return "borrow";
      if (prev === "borrow") return "supply";
      if (prev === "withdraw") return "repay";
      if (prev === "repay") return "withdraw";
      return prev;
    });
  }, []);

  const toggleWrappedNativeToken = useCallback(() => {
    if (token.wrapperToken?.wrappedToken?.isNative)
      setSelectedToken(token.wrapperToken);
    if (token.wrappedToken?.isNative) setSelectedToken(token.wrappedToken);
  }, [token]);

  useEffect(() => {
    if (isVisible) {
      setIsBorrow(defaultIsBorrow);
      setActiveTab(defaultIsBorrow ? "borrow" : "supply");
    }
  }, [isVisible, defaultIsBorrow]);

  const { market, isMarketLoading } = useMarket(marketID, token);
  const { setSearchQuery } = useSearch("vaults");

  if (isMarketLoading || !market) return null;

  const isSupply = !isBorrow && activeTab === "supply";
  const isWithdraw = !isBorrow && activeTab === "withdraw";
  const isBorrowTab = isBorrow && activeTab === "borrow";
  const isRepay = isBorrow && activeTab === "repay";

  const isVault = !!token.pair;

  return (
    <Dialog
      open={isVisible}
      onOpenChange={(open: boolean) => {
        if (!open && onClose) onClose();
      }}
    >
      <VisuallyHidden>
        <DialogDescription>
          Perform supply, borrow, and repay actions
        </DialogDescription>
      </VisuallyHidden>
      <DialogContent
        autoFocus={false}
        className="bg-card text-primary overflow-y-auto pt-12 select-none"
      >
        <div tabIndex={0} aria-hidden="true" />
        {isVault ? (
          <div className="absolute left-5 top-5">
            <Image src={token.icon} alt="Vault Icon" width={30} height={30} />
          </div>
        ) : (
          <Button
            variant="default"
            className="w-[120px] z-[999] absolute left-4 top-4 items-center justify-center gap-2"
            onClick={toggleMode}
          >
            <RefreshCw className="w-5 h-5" />
            {isBorrow ? "Supply" : "Borrow"}
          </Button>
        )}
        {(token.isNative || token.wrappedToken?.isNative) && (
          <Button
            className="w-[160px] z-[999] absolute left-[150px] top-4 items-center justify-center gap-2"
            onClick={toggleWrappedNativeToken}
          >
            <RefreshCw className="w-5 h-5" />
            {token.isNative ? "Use Wrapped" : "Use Native"}
          </Button>
        )}
        <div className="absolute right-5 top-6">
          {token.pair ? (
            <>
              <button
                onClick={() => setIsOpen(true)}
                className="absolute right-0 mr-4 flex items-center gap-2 text-primary"
              >
                Get
                <ExternalLinkIcon className="w-4 h-4" />
              </button>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Supplying a vault-backed Market</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <ol className="list-decimal list-inside mt-2 text-white">
                      <li>
                        Go to{" "}
                        <Link
                          href={token.buyLink}
                          target="_blank"
                          className="text-blue-500 underline"
                        >
                          this link
                        </Link>{" "}
                        and create some LP{" "}
                        <span className="font-bold underline text-red-500">
                          (be sure to check "do not stake LP" if you are using
                          SwapX)
                        </span>
                        <br />
                        Note that on ICHI you must deposit{" "}
                        {token.pair![0].symbol} to receive the proper LP.
                      </li>
                      <li>
                        Deposit the LP in the corresponding{" "}
                        <Link
                          href="/vaults"
                          target="_blank"
                          className="text-blue-500 underline"
                          onClick={() => {
                            setSearchQuery(token.name);
                          }}
                        >
                          vault
                        </Link>
                        .
                      </li>
                      <li>
                        You can now use your vault shares to supply this market.
                      </li>
                    </ol>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <Link
              href={token.buyLink}
              target="_blank"
              className="absolute right-0 mr-4 flex items-center gap-2"
            >
              Get
              <ExternalLinkIcon className="w-4 h-4 text-primary" />
            </Link>
          )}
        </div>

        <div className="relative w-full flex items-center justify-center mt-6">
          <div className={`flex items-center ${isVault ? "gap-8" : "gap-4"}`}>
            {isVault ? (
              <DoubleAvatar
                firstSrc={token.pair![0].icon}
                secondSrc={token.pair![1].icon}
                firstAlt={token.pair![0].symbol}
                secondAlt={token.pair![1].symbol}
              />
            ) : (
              <Image src={token.icon} alt="logo" width={35} height={35} />
            )}
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm font-semibold">{token.name}</span>
              <span className="text-xs font-light">{token.symbol}</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <Image
            src="/logo.svg"
            alt="Background Logo"
            className="opacity-10"
            width={500}
            height={500}
          />
        </div>

        <div className="relative z-10">
          <DialogHeader>
            <DialogTitle className="flex">
              <ActiveTabSelector
                isBorrow={isBorrow}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </DialogTitle>
            <div className="text-sm flex flex-col gap-8 pt-10 text-primary">
              {isSupply && (
                <SupplyForm token={token} market={market} marketID={marketID} />
              )}
              {isWithdraw && (
                <WithdrawForm
                  token={token}
                  market={market}
                  marketID={marketID}
                />
              )}
              {isBorrowTab && (
                <BorrowForm token={token} market={market} marketID={marketID} />
              )}
              {isRepay && (
                <RepayForm token={token} market={market} marketID={marketID} />
              )}
            </div>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
};
