"use client";
import { SearchFilter } from "@/components/search-filter";
import { NetworkTvl } from "@/components/vaults/network-tvl";
import { VaultTable } from "@/components/vaults/vault-table";
import { bnToStr } from "@/helpers";
import { useTokenBalance } from "@/hooks";

export default function Page() {
  return (
    <div className=" p-4 h-full rounded-lg mx-10 my-[150px] flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-2 items-center justify-between">
        <SearchFilter route="vaults" isFilteringProjects={true} />
        <div className="flex items-center space-x-4">
          <NetworkTvl />
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-card p-4 rounded-lg shadow-xl">
        <VaultTable />
      </div>
    </div>
  );
}
