"use client";

import { useState } from "react";
import { ArrowRightIcon, PowerIcon } from "lucide-react";
import { Wallet } from "../icons/wallet";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatAddress } from "@/lib/utils";
import Image from "next/image";

interface ConnectWalletDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ConnectWalletDialog = ({
  isOpen,
  setIsOpen,
}: ConnectWalletDialogProps) => {
  const { connect, connectors } = useConnect();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center">
          <div className="py-4">
            <Image
              src="/logo.svg"
              alt="Vicuna Finances"
              width={60}
              height={60}
            />
          </div>
          <DialogTitle className="text-3xl">Connect Wallet</DialogTitle>
          <p className="text-xs">To start using Vicuna Finance</p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {connectors.map((connector) => (
            <Button
              className="hover:bg-accent hover:text-primary flex items-center justify-between"
              key={connector.id}
              onClick={() => {
                connect({ connector });
                setIsOpen(false);
              }}
            >
              {connector.name} <ArrowRightIcon className="w-4 h-4" />
            </Button>
          ))}
        </div>
        <DialogFooter className="text-[10px] text-center">
          By connecting, I accept the Vicuna Finance{" "}
          <a
            href="https://vicuna-finance.gitbook.io/vicuna-finance/other-info/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
            className=" pl-1 text-accent"
          >
            Terms of Service
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface ConnectWalletButtonProps {
  onClick: () => void;
}

export const ConnectWalletButton = ({ onClick }: ConnectWalletButtonProps) => (
  <Button variant="default" className="bg-primary" onClick={onClick}>
    Connect Wallet
    <Wallet className="w-5 h-5 ml-2" />
  </Button>
);

export const ConnectWallet = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="bg-primary">
            <span className="hidden sm:inline">{formatAddress(address)}</span>
            <Wallet className="w-5 h-5 ml-0 sm:ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-40">
          <DropdownMenuItem
            onClick={() => disconnect()}
            className="flex items-center justify-between"
          >
            Disconnect <PowerIcon className="w-4 h-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <ConnectWalletButton onClick={() => setIsOpen(true)} />
      <ConnectWalletDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
