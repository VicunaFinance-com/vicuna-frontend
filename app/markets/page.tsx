"use client";
import { SearchFilter } from "@/components/search-filter";
import { BorrowTable } from "@/components";

export default function Page() {
  return (
    <div className="relative">
      <div className=" p-4 h-full rounded-lg mx-10 my-[150px] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <SearchFilter route="markets" isFilteringProjects={false} />
        </div>
        <div className="flex flex-col gap-4 bg-card p-4 rounded-lg shadow-xl">
          <BorrowTable />
        </div>
      </div>
    </div>
  );
}
