"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatNumberWithSuffix } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { vaultData } from "@/lib/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount } from "wagmi";
import { VaultFilter } from "./vault-filter";
import { DepositVaultModal } from "./deposit-vault-modal";

export const VaultTable = () => {
  const { address } = useAccount();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [vault, setVault] = useState(searchParams.get("vault") || "all");

  const updateURL = useCallback(
    (vault: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (vault !== "all") params.set("vault", vault);
      else params.delete("vault");

      router.push(`/vaults?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  useEffect(() => {
    updateURL(vault);
  }, [vault, updateURL]);

  const handleVaultChange = (value: string) =>
    setVault(value === "my" ? address || "all" : value);

  return (
    <div className="p-4">
      <VaultFilter />
      <Table>
        <TableHeader>
          <TableHead className="flex items-center gap-4 h-24">
            Vaults{" "}
            <div className="flex items-center space-x-4 mb-4">
              <Tabs
                value={vault}
                onValueChange={handleVaultChange}
                className="w-[400px]"
              >
                <TabsList>
                  <TabsTrigger value="all">All Vaults</TabsTrigger>
                  <TabsTrigger value="my">My Vaults</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </TableHead>
          <TableHead>Wallet</TableHead>
          <TableHead>Deposited</TableHead>
          <TableHead>APY</TableHead>
          <TableHead>Daily</TableHead>
          <TableHead></TableHead>
        </TableHeader>
        <TableBody>
          {vaultData.map((vault, index) => (
            <TableRow key={index} className="text-primary border-t-background">
              <TableCell>
                <div className="flex items-center gap-10">
                  <Avatar className="bg-background">
                    <AvatarImage
                      src={`/images/vaults/vault-${index + 1}.png`}
                    />
                    <AvatarFallback>Vault</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg ">{vault.vaultName}</p>
                    <p className="text-sm font-light">
                      TVL: {formatNumberWithSuffix(vault.vaultTVL)}
                    </p>
                    <p className="text-sm font-light">
                      Dex TVL: {formatNumberWithSuffix(vault.vaultDexTVL)}
                    </p>
                    {vault.vBoost && (
                      <Badge
                        variant={"accent"}
                        className="flex items-center justify-between"
                      >
                        <Image
                          src="/icons/rounded-logo.png"
                          alt="V-Boost"
                          width={16}
                          height={16}
                        />
                        V-Boost
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{vault.wallets}</TableCell>
              <TableCell>{vault.deposited}</TableCell>
              <TableCell>{vault.apy}%</TableCell>
              <TableCell>{vault.daily}%</TableCell>
              <TableCell className="flex gap-10 justify-center pt-10">
                <DepositVaultModal vault={vault} />
                <Button>Withdraw</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
