import { contextUseSearch } from "@/components";

const useSearch = <T = string>(
  searchKey: string,
  transform: (item: T) => string = (item) => item as unknown as string
) => {
  const { searchQueries, setSearchQuery, clearSearchQuery } =
    contextUseSearch();
  const searchTerm = searchQueries[searchKey]?.toLowerCase() || "";

  const filter = (items: T[]): T[] => {
    if (!searchTerm) return items;
    return items.filter((item) =>
      transform(item).toLowerCase().includes(searchTerm)
    );
  };

  return {
    searchTerm,
    filter,
    setSearchQuery: (value: string) => setSearchQuery(searchKey, value),
    clearSearchQuery: () => clearSearchQuery(searchKey),
  };
};

export { useSearch };
