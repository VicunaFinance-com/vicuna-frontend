"use client";

import { usePortfolio } from "@/hooks";

import { useState } from "react";
import { GlobalSummary, MarketsPortfolio, VaultsPortfolio } from "@/components";

const PortfolioSelectorButton = ({
  text,
  active,
  onClick,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
      active ? "bg-accent-500 text-white" : "text-accent-400"
    }`}
  >
    {text}
  </button>
);

const PortfolioSelector = <T extends string>({
  options,
  selected,
  setSelected,
}: {
  options: readonly T[];
  selected: T;
  setSelected: (option: T) => void;
}) => {
  return (
    <div className="flex self-center bg-accent-900 text-accent-400 rounded-[var(--radius)] p-1 space-x-2">
      {options.map((option) => (
        <PortfolioSelectorButton
          key={option}
          text={option}
          active={option === selected}
          onClick={() => setSelected(option)}
        />
      ))}
    </div>
  );
};

export const Portfolio = () => {
  const { markets, vaults, summary } = usePortfolio();
  const options = [
    "Global Summary",
    "Markets Portfolio",
    "Vaults Portfolio",
  ] as const;
  const [selected, setSelected] =
    useState<(typeof options)[number]>("Global Summary");
  return (
    <div className="flex flex-col gap-6">
      <PortfolioSelector
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
      {selected == "Global Summary" && <GlobalSummary summary={summary} />}
      {selected == "Markets Portfolio" && (
        <MarketsPortfolio markets={markets} />
      )}
      {selected == "Vaults Portfolio" && <VaultsPortfolio vaults={vaults} />}
    </div>
  );
};
