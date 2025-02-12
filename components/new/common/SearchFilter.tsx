"use client";
import { useSearch } from "@/hooks";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchFilterProps {
  searchKey: string;
}

export const SearchFilter = ({ searchKey }: SearchFilterProps) => {
  const { searchTerm, setSearchQuery } = useSearch(searchKey);
  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-4 lg:items-center justify-between">
      <div className="relative w-full max-w-sm">
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 text-primary"
        />
        <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
      </div>
    </div>
  );
};
