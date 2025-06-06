import {
  MarketSelector,
  MarketsTVL,
  MarketTable,
  SearchFilter,
} from "@/components";

export default function Page() {
  return (
    <div className="relative">
      <div className="p-4 h-full rounded-lg mx-10 my-[150px] flex flex-col gap-4">
        <div className="flex items-center gap-4 justify-between flex-wrap">
          <div className="flex items-start min-[1200px]:items-center gap-4 flex-wrap">
            <SearchFilter searchKey="markets" />
            <MarketSelector />
          </div>
          <MarketsTVL />
        </div>
        <div className="flex flex-col gap-4 bg-card p-4 rounded-lg shadow-xl">
          <MarketTable />
        </div>
      </div>
    </div>
  );
}
