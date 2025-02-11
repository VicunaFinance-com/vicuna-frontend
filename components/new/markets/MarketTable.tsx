"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableCellWP,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MarketModal } from "./MarketModal";
import { useMarket, useSelectedMarket } from "@/hooks";
import { Token } from "@/types";
import { formatSuffix, trimmedNumber } from "@/helpers";
import { useState } from "react";
import Image from "next/image";
import { HealthBar } from "@/components";

const FullEligibleRewards = () => (
  <div className="flex flex-col border">
    <div className="flex justify-between items-center gap-1 px-[6px] font-semibold border-b text-xs">
      Gems{" "}
      <div className="relative w-3 h-3">
        <Image src={"/icons/incentives/gems-05.png"} alt={""} fill />
      </div>
    </div>
    <div className="flex justify-between items-center gap-1 px-[6px] font-semibold border-b text-xs">
      Points{" "}
      <div className="relative w-3 h-3">
        <Image src={"/icons/incentives/Sonic_Black.svg"} alt={""} fill />
      </div>
    </div>
    <div className="flex justify-between items-center gap-1 px-[6px] font-semibold text-xs">
      Airdrop{" "}
      <div className="relative w-3 h-3">
        <Image src={"/icons/incentives/Parachuting-08.png"} alt={""} fill />
      </div>
    </div>
  </div>
);

const BorrowLine = ({
  token,
  onSelectToken,
}: {
  token: Token;
  onSelectToken: (token: Token) => void;
}) => {
  const { market, isMarketLoading, borrowIncentives, supplyIncentives } =
    useMarket(token.address);
  if (isMarketLoading || !market) return null;
  return (
    <TableRow
      className="text-primary border-t-background cursor-pointer hover:bg-background/50"
      onClick={() => onSelectToken(token)}
    >
      <TableCell>
        <div className="flex items-center gap-10">
          <Avatar className="bg-transparent p-1.5">
            <AvatarImage src={token.icon} className="object-contain" />
            <AvatarFallback>{token.symbol}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-lg ">{token.name}</p>
            <p className="text-xs font-light">{token.symbol}</p>
          </div>
        </div>
      </TableCell>
      <TableCellWP>
        <FullEligibleRewards />
      </TableCellWP>
      <TableCell className="flex flex-col">
        <p className="text-md">{formatSuffix(market.totalSupplied.amount)}</p>
        <p className="text-xs font-light">
          ${formatSuffix(market.totalSupplied.value)}
        </p>
      </TableCell>
      <TableCell>
        {market.supplyAPY > 0.01 ? trimmedNumber(market.supplyAPY, 2) : "<0.01"}
        %
      </TableCell>
      <TableCell className="flex flex-col">
        <p className="text-md">{formatSuffix(market.totalBorrowed.amount)}</p>
        <p className="text-xs font-light">
          ${formatSuffix(market.totalBorrowed.value)}
        </p>
      </TableCell>
      <TableCell>
        {market.borrowAPY > 0.01 ? trimmedNumber(market.borrowAPY, 2) : "<0.01"}
        %
      </TableCell>
    </TableRow>
  );
};

export const BorrowTable = () => {
  const { marketDefinition } = useSelectedMarket();
  const [selectedToken, setSelectedToken] = useState<Token>(
    marketDefinition.tokens[0]
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const onSelectToken = (token: Token) => {
    setSelectedToken(token);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-4 gap-6 flex flex-col">
      <Table>
        <TableHeader className="h-8 border-b border-background">
          <TableHead className="text-muted">
            <div className="flex items-center gap-2">ASSET</div>
          </TableHead>
          <TableHead className="text-muted">
            <div className="flex items-center gap-2">ELIGIBLE FOR</div>
          </TableHead>
          <TableHead className="text-muted">
            <div className="flex items-center gap-2">TOTAL SUPPLIED</div>
          </TableHead>
          <TableHead className="text-muted">
            <div className="flex items-center gap-2">SUPPLY APY</div>
          </TableHead>
          <TableHead className="text-muted">
            <div className="flex items-center gap-2">TOTAL BORROWED</div>
          </TableHead>
          <TableHead className="text-muted">
            <div className="flex items-center gap-2">INTEREST RATE</div>
          </TableHead>
        </TableHeader>
        <TableBody>
          {marketDefinition.tokens.map((token) => (
            <BorrowLine
              key={token.address}
              token={token}
              onSelectToken={onSelectToken}
            />
          ))}
        </TableBody>
      </Table>
      <HealthBar />

      <MarketModal
        token={selectedToken}
        isVisible={isModalOpen}
        onClose={closeModal}
        setSelectedToken={setSelectedToken}
      />
    </div>
  );
};
