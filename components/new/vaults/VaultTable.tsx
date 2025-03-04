"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { DoubleAvatar } from "@/components/ui/double-avatar";

import { VaultDefinition } from "@/types";
import { useSearch, useVaults, useVault } from "@/hooks";
import {
  ApyBreakdown,
  FullEligibleRewards,
  MerklNote,
  SortableTableHead,
  SortBy,
  VaultModal,
} from "@/components";
import { BeefyVaultV7Abi, ClientMap, VAULTS } from "@/constants";
import { formatSuffix } from "@/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const VaultLine = ({
  vaultDefinition,
  onSelectVault,
}: {
  vaultDefinition: VaultDefinition;
  onSelectVault: (vault: VaultDefinition) => void;
}) => {
  const { vault } = useVault(vaultDefinition);

  return (
    <TableRow
      className="text-primary border-t-background cursor-pointer hover:bg-background/50"
      onClick={() => onSelectVault(vaultDefinition)}
    >
      <TableCell>
        <div className="flex items-center gap-10">
          <div className="flex flex-row gap-2 items-center">
            <Avatar className="bg-transparent p-1.5">
              <AvatarImage
                src={vaultDefinition.receipt.icon}
                className="object-contain"
              />
              <AvatarFallback>{vaultDefinition.receipt.symbol}</AvatarFallback>
            </Avatar>
            <DoubleAvatar
              firstSrc={vaultDefinition.tokens[0].icon}
              secondSrc={vaultDefinition.tokens[1].icon}
              firstAlt={vaultDefinition.tokens[0].symbol}
              secondAlt={vaultDefinition.tokens[1].symbol}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg ">{vaultDefinition.receipt.name}</p>
            <p className="text-xs font-light">
              TVL: ${formatSuffix(vault.tvl)}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <FullEligibleRewards />
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="text-sm">{formatSuffix(vault.lp.display)}</span>
          <span className="text-xs font-light">
            ${formatSuffix(vault.lp.usdValue)}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="text-sm">{formatSuffix(vault.receipt.display)}</span>
          <span className="text-xs font-light">
            ${formatSuffix(vault.receipt.usdValue)}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-green-500">
        <div className="flex flex-row gap-1 items-center text-green-500">
          {vault.apr.toFixed(2)}%
          <ApyBreakdown breakdown={vault.breakdown} note={<MerklNote />} />
        </div>
      </TableCell>
      <TableCell className="text-green-500">
        {(((1 + vault.apr / 100) ** (1 / 365) - 1) * 100).toPrecision(2)}%
      </TableCell>
    </TableRow>
  );
};

export const VaultTable = () => {
  const { vaults } = useVaults(VAULTS);
  const { filter } = useSearch(
    "vaults",
    (vault: VaultDefinition) => vault.receipt.name
  );

  const [selectedVault, setSelectedVault] = useState<VaultDefinition>(
    VAULTS[0]
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const onSelectVault = (vault: VaultDefinition) => {
    setSelectedVault(vault);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [sortBy, setSortBy] = useState<SortBy | null>(null);

  const sort = (vaultDefinitions: VaultDefinition[]) => {
    if (!sortBy || !vaults) return vaultDefinitions;
    return vaultDefinitions.slice().sort((a, b) => {
      const vaultA = vaults[a.id].vault;
      const vaultB = vaults[b.id].vault;
      if (!vaultA || !vaultB) return 0;

      const valA = sortBy.extract(vaultA);
      const valB = sortBy.extract(vaultB);
      return (valA > valB ? 1 : -1) * (sortBy.order === "asc" ? 1 : -1);
    });
  };

  return (
    <div className="p-4 gap-6 flex flex-col">
      <Table>
        <TableHeader className="h-8 border-b border-background">
          <TableRow>
            <SortableTableHead
              label="VAULTS"
              extract={(v) => v.name.toLowerCase()}
              sortBy={sortBy}
              setSortBy={setSortBy}
              defaultOrder="asc"
            />
            <TableHead className="text-muted">
              <div className="flex items-center gap-2">ELIGIBLE FOR</div>
            </TableHead>
            <SortableTableHead
              label="LP IN WALLET"
              extract={(v) => parseFloat(v.lp.usdValue)}
              sortBy={sortBy}
              setSortBy={setSortBy}
              defaultOrder="desc"
            />
            <SortableTableHead
              label="DEPOSITED"
              extract={(v) => {
                return parseFloat(v.receipt.usdValue);
              }}
              sortBy={sortBy}
              setSortBy={setSortBy}
              defaultOrder="desc"
            />
            <SortableTableHead
              label="APR"
              extract={(v) => v.apr}
              sortBy={sortBy}
              setSortBy={setSortBy}
              defaultOrder="desc"
            />
            <SortableTableHead
              label="DAILY"
              extract={(v) => v.apr}
              sortBy={sortBy}
              setSortBy={setSortBy}
              defaultOrder="desc"
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sort(filter(VAULTS)).map((vaultDefinition) => (
            <VaultLine
              key={vaultDefinition.id}
              vaultDefinition={vaultDefinition}
              onSelectVault={onSelectVault}
            />
          ))}
        </TableBody>
      </Table>
      <VaultModal
        vaultDefinition={selectedVault}
        isVisible={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
