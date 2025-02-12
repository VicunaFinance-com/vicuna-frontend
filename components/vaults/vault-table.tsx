"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableCellWP,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DoubleAvatar } from "@/components/ui/double-avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Config, useAccount } from "wagmi";
import { AssetFilter } from "../asset-filter";
import { DepositVaultModalCLM } from "./deposit-vault-modal-clm";
import { WithdrawVaultModalCLM } from "./withdraw-vault-modal-clm";
import { DepositVaultModalV7 } from "./deposit-vault-modal-v7";
import { WithdrawVaultModalV7 } from "./withdraw-vault-modal-v7";
import { FilterIcon } from "../icons/filter";

import vaultData from "@/config/sonic.json";
import { BreakdownData, VaultDataPlus, LpsData } from "@/types/vault";

import BeefyVaultCLM from "@/config/BeefyVaultConcLiq.json";
import BeefyVaultV7 from "@/config/BeefyVaultV7.json";
import { readContract } from "@wagmi/core";
import { config } from "@/lib/config";
import { Address, formatEther } from "viem";
import axios from "axios";
import { useTvl } from "@/hooks/useTvl";
import { formatNumberWithSuffix } from "@/lib/utils";
import { useSearch } from "@/hooks";

const fetchBreakdown = async () => {
  try {
    const response = await axios.get("https://vicuna.orthae.xyz/apy/breakdown");
    const breakdownData = response.data;
    return breakdownData;
  } catch (error) {
    console.error("Error fetching APY:", error);
  }
};

const fetchLps = async () => {
  try {
    const response = await axios.get("https://vicuna.orthae.xyz/lps");
    const lpsData = response.data;
    return lpsData;
  } catch (error) {
    console.error("Error fetching APY:", error);
  }
};

export const VaultTable = () => {
  const { address } = useAccount();
  const [vaults, setVaults] = useState<VaultDataPlus[]>(
    vaultData as VaultDataPlus[]
  );
  const { filter } = useSearch("vaults", (vault: VaultDataPlus) => vault.name);
  const [refreshKey, setRefreshKey] = useState(0);
  console.log(filter(vaults));

  const { tvl } = useTvl();

  const [breakdown, setBreakdown] = useState<BreakdownData>();
  const [lps, setLps] = useState<LpsData>();

  useEffect(() => {
    fetchBreakdown().then((data) => {
      setBreakdown(data);
    });

    fetchLps().then((data) => {
      setLps(data);
    });
  }, []);

  useEffect(() => {
    const fetchVaultData = async () => {
      if (!lps) {
        return;
      }
      const updatedVaults = await Promise.all(
        vaultData.map(async (vault) => {
          try {
            if (vault.kind === "clm") {
              let walletBalanceEth = "0";
              let vaultBalanceEth0 = "0";
              let vaultBalanceEth1 = "0";
              if (address && address != undefined) {
                const vaultBalance = (await readContract(config as Config, {
                  abi: BeefyVaultCLM.abi,
                  address: vault.vaultAddress as Address,
                  functionName: "balances",
                })) as [bigint, bigint];

                const balance = (await readContract(config as Config, {
                  abi: BeefyVaultCLM.abi,
                  address: vault.vaultAddress as Address,
                  functionName: "balanceOf",
                  args: [address as Address],
                })) as bigint;

                walletBalanceEth = parseFloat(formatEther(balance))
                  .toFixed(9)
                  .replace(/(\.\d*?)0+$/, "$1")
                  .replace(/\.$/, "");
                vaultBalanceEth0 = parseFloat(formatEther(vaultBalance[0]))
                  .toFixed(9)
                  .replace(/(\.\d*?)0+$/, "$1")
                  .replace(/\.$/, "");
                vaultBalanceEth1 = parseFloat(formatEther(vaultBalance[1]))
                  .toFixed(9)
                  .replace(/(\.\d*?)0+$/, "$1")
                  .replace(/\.$/, "");
              }

              return {
                ...vault,
                wallet: walletBalanceEth,
                deposited: {
                  token0: vaultBalanceEth0,
                  token1: vaultBalanceEth1,
                },
                breakdown: breakdown ? breakdown[vault.id] : undefined,
                tvl: tvl?.["146"] ? tvl["146"][vault.id] : 0,
              };
            }

            if (vault.kind === "v7") {
              let depositedBalanceEth = "0";
              let walletBalanceEth = "0";

              let depositedBalanceUSD = "0";
              let walletBalanceUSD = "0";

              if (address && address != undefined) {
                const balance = (await readContract(config as Config, {
                  abi: BeefyVaultV7.abi,
                  address: vault.vaultAddress as Address,
                  functionName: "balanceOf",
                  args: [address as Address],
                })) as bigint;

                const tokenAddress = await readContract(config as Config, {
                  abi: BeefyVaultV7.abi,
                  address: vault.vaultAddress as Address,
                  functionName: "want",
                });

                if (!tokenAddress) {
                  throw new Error("Invalid response from want function");
                }

                const walletBalance = (await readContract(config as Config, {
                  abi: BeefyVaultV7.abi,
                  address: tokenAddress as Address,
                  functionName: "balanceOf",
                  args: [address as Address],
                })) as bigint;

                const vaultPrice = (await readContract(config as Config, {
                  abi: BeefyVaultV7.abi,
                  address: vault.vaultAddress as Address,
                  functionName: "getPricePerFullShare",
                })) as bigint;

                depositedBalanceEth = parseFloat(formatEther(balance))
                  .toFixed(9)
                  .replace(/(\.\d*?)0+$/, "$1")
                  .replace(/\.$/, "");
                walletBalanceEth = parseFloat(formatEther(walletBalance))
                  .toFixed(9)
                  .replace(/(\.\d*?)0+$/, "$1")
                  .replace(/\.$/, "");

                depositedBalanceUSD = (
                  parseFloat(formatEther(balance)) *
                  lps?.[vault.id] *
                  parseFloat(formatEther(vaultPrice))
                )
                  .toFixed(2)
                  .replace(/(\.\d*?)0+$/, "$1")
                  .replace(/\.$/, "");
                walletBalanceUSD = (
                  parseFloat(formatEther(walletBalance)) *
                  lps?.[vault.id] *
                  parseFloat(formatEther(vaultPrice))
                )
                  .toFixed(2)
                  .replace(/(\.\d*?)0+$/, "$1")
                  .replace(/\.$/, "");
              }
              return {
                ...vault,
                wallet: walletBalanceEth,
                walletUSD: walletBalanceUSD,
                deposited: {
                  token0: depositedBalanceEth,
                  token1: "0",
                },
                depositedUSD: {
                  token0: depositedBalanceUSD,
                  token1: "0",
                },
                breakdown: breakdown ? breakdown[vault.id] : undefined,
                tvl: tvl?.["146"] ? tvl["146"][vault.id] : 0,
              };
            }
          } catch (error) {
            console.error(`Error fetching data for vault ${vault.id}:`, error);
            return { ...vault };
          }
        })
      );

      setVaults(updatedVaults as VaultDataPlus[]);
    };

    fetchVaultData();
  }, [address, refreshKey, breakdown, tvl, lps]);

  return (
    <div className="p-4">
      {/* <AssetFilter /> */}
      <Table>
        <TableHeader className="border-b border-background">
          <TableHead className="flex items-center gap-4 h-16 font-bold text-base ">
            Vaults
            <div className="flex items-center gap-4 justify-center">
              <Tabs>
                <TabsList>
                  <TabsTrigger value="all" className="text-primary">
                    All Vaults
                  </TabsTrigger>
                  {/* <TabsTrigger value="personal" className="text-primary">
                    My Vaults
                  </TabsTrigger> */}
                </TabsList>
              </Tabs>
            </div>
          </TableHead>
          <TableHead className="text-muted uppercase">
            <div className="flex items-center gap-2 cursor-pointer">
              Eligible For
            </div>
          </TableHead>
          <TableHead className="text-muted uppercase">
            <div className="flex items-center gap-2 cursor-pointer">
              Wallet <FilterIcon />
            </div>
          </TableHead>
          <TableHead className="text-muted uppercase">
            <div className="flex items-center gap-2 cursor-pointer">
              Deposited <FilterIcon />
            </div>
          </TableHead>
          <TableHead className="text-muted uppercase">
            <div className="flex items-center gap-2 cursor-pointer">
              APY <FilterIcon />
            </div>
          </TableHead>
          <TableHead className="text-muted uppercase">
            <div className="flex items-center gap-2 cursor-pointer">
              Daily <FilterIcon />
            </div>
          </TableHead>
          <TableHead></TableHead>
        </TableHeader>
        <TableBody>
          {filter(vaults).map((vault, index) => (
            <TableRow
              key={index}
              className="relative text-primary border-t-background"
            >
              <TableCell>
                {vault.dexImage === "/icons/dex/equalizer.svg" ? (
                  <div className="absolute flex items-center left-[-9px] h-[calc(100%-32px)]">
                    <Image
                      src={vault.dexImage}
                      alt={""}
                      height={50}
                      width={50}
                    />
                  </div>
                ) : vault.dexImage === "/icons/dex/beets.fi.svg" ? (
                  <div className="absolute flex items-center left-[0] h-[calc(100%-32px)]">
                    <Image
                      src={vault.dexImage}
                      alt={""}
                      height={28}
                      width={28}
                    />
                  </div>
                ) : (
                  <div className="absolute flex items-center left-[0] h-[calc(100%-32px)]">
                    <Image
                      src={vault.dexImage}
                      alt={""}
                      height={28}
                      width={28}
                    />
                  </div>
                )}

                <div className="flex items-center gap-10 ml-8">
                  <DoubleAvatar
                    firstSrc={vault?.imageSrc1!}
                    secondSrc={vault?.imageSrc0!}
                    firstAlt={vault?.token1Name!}
                    secondAlt={vault?.token0Name!}
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-lg ">{vault.name}</p>
                    <p className="text-xs font-light">
                      TVL: {formatNumberWithSuffix(vault.tvl ?? 0)}
                    </p>
                    {/* <p className="text-sm font-light">
                      Dex TVL: {formatNumberWithSuffix(vault.vaultTVL ?? 0)}
                    </p>  */}
                    {/* VBoost here */}
                    {false && (
                      <Badge
                        variant={"accent"}
                        className="flex items-center justify-between"
                      >
                        <Image
                          src="/logo.svg"
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

              {/* Eligible For */}
              <TableCellWP>
                <div className="flex flex-col border">
                  <div className="flex justify-between items-center gap-1 px-[6px] font-semibold border-b text-xs">
                    Gems{" "}
                    <div className="relative w-3 h-3">
                      <Image
                        src={"/icons/incentives/gems-05.png"}
                        alt={""}
                        fill
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-1 px-[6px] font-semibold border-b text-xs">
                    Points{" "}
                    <div className="relative w-3 h-3">
                      <Image
                        src={"/icons/incentives/Sonic_Black.svg"}
                        alt={""}
                        fill
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-1 px-[6px] font-semibold text-xs">
                    Airdrop{" "}
                    <div className="relative w-3 h-3">
                      <Image
                        src={"/icons/incentives/Parachuting-08.png"}
                        alt={""}
                        fill
                      />
                    </div>
                  </div>
                </div>
              </TableCellWP>

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-light text-sm">
                    {vault?.wallet ?? "0"}
                  </span>
                  <span className="font-light text-sm">
                    ${vault?.walletUSD ?? "0"}
                  </span>
                </div>
              </TableCell>

              {vault.kind === "clm" ? (
                <TableCell>
                  {vault?.name.split("-")[0]} {vault?.deposited?.token0 ?? "0"}{" "}
                  <br /> {vault?.name.split("-")[1]}{" "}
                  {vault?.deposited?.token1 ?? "0"}
                </TableCell>
              ) : (
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-light text-sm">
                      {vault?.deposited?.token0 ?? "0"}
                    </span>
                    <span className="font-light text-sm">
                      ${vault?.depositedUSD?.token0 ?? "0"}
                    </span>
                  </div>
                </TableCell>
              )}

              {/* Apy */}
              <TableCell className="text-green-500">
                {typeof vault?.breakdown?.totalApy === "number"
                  ? (vault.breakdown.totalApy * 100).toFixed(3)
                  : 0}
                %
              </TableCell>

              {/* Daily */}
              <TableCell>
                {vault?.breakdown?.tradingApr
                  ? ((vault?.breakdown?.tradingApr * 100) / 365).toFixed(4) ?? 0
                  : vault?.breakdown?.vaultApr !== undefined
                  ? ((vault.breakdown.vaultApr * 100) / 365).toFixed(4)
                  : 0}
                %
              </TableCell>

              {vault.kind === "clm" ? (
                <TableCell className="flex gap-10 justify-center items-center">
                  <DepositVaultModalCLM
                    vault={vault}
                    onApprove={() => setRefreshKey((prevKey) => prevKey + 1)}
                  />
                  <WithdrawVaultModalCLM
                    vault={vault}
                    onApprove={() => setRefreshKey((prevKey) => prevKey + 1)}
                  />
                </TableCell>
              ) : (
                <TableCell className="flex gap-10 justify-center items-center">
                  <DepositVaultModalV7
                    vault={vault}
                    lps={lps?.[vault.id]}
                    onApprove={() => setRefreshKey((prevKey) => prevKey + 1)}
                  />
                  <WithdrawVaultModalV7
                    vault={vault}
                    lps={lps?.[vault.id]}
                    onApprove={() => setRefreshKey((prevKey) => prevKey + 1)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
