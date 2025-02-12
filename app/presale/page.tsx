"use client";
import { PresaleModal } from "@/components/presale/presale-modal";
import { SwitchChain } from "@/components/switch-chain";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const searchParams = useSearchParams();
  let refer = searchParams.get("refer");
  const [balance, setBalance] = useState<string>("-1");
  const [selectedCoin, setSelectedCoin] = useState<string>("USDC");
  const [hardCap, setHardCap] = useState<number>(0);
  const [totalDeposited, setTotalDeposited] = useState<number>(0);

  return (
    <div className="relative">
      <div className="bg-card p-4 h-full rounded-lg mx-10 mx-auto my-[150px] flex flex-col gap-6 shadow-2xl w-full max-w-lg">
        <div className="flex flex-col justify-evenly gap-4">
          <h1 className="text-primary text-lg font-semibold text-[#f22321] text-center">
            Vicuna Finance Presale
          </h1>
          <div className="flex justify-end">
            <SwitchChain />
          </div>
          <p className="text-primary text-base font-semibold text-left">
            Wallet Balance:{" "}
            <span className="text-[#f22321]">
              {Number(balance).toLocaleString()} {selectedCoin}
            </span>
          </p>
          <p className="text-primary text-base font-semibold text-left">
            HardCap:{" "}
            <span className="text-[#f22321]">${hardCap.toLocaleString()}</span>
          </p>
          <p className="text-primary text-base font-semibold text-left">
            Total deposited amount:{" "}
            <span className="text-[#f22321]">
              ${totalDeposited.toLocaleString()}
            </span>
          </p>

          <PresaleModal
            setBalance={setBalance}
            setSelectedCoin={setSelectedCoin}
            setHardCap={setHardCap}
            setTotalDeposited={setTotalDeposited}
            referCode={refer}
          />
        </div>
      </div>
    </div>
  );
}
