"use client";
import { createContext, useContext, useEffect, useState } from "react";

type SearchContextType = {
  searchQueries: Record<string, string>;
  setSearchQuery: (key: string, value: string) => void;
  clearSearchQuery: (key: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>(
    () => {
      try {
        const stored = localStorage.getItem("searchQueries");
        return stored ? JSON.parse(stored) : {};
      } catch {
        return {};
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("searchQueries", JSON.stringify(searchQueries));
  }, [searchQueries]);

  const setSearchQuery = (key: string, value: string) => {
    setSearchQueries((prev) => ({ ...prev, [key]: value }));
  };

  const clearSearchQuery = (key: string) => {
    setSearchQueries((prev) => {
      const newQueries = { ...prev };
      delete newQueries[key];
      return newQueries;
    });
  };

  return (
    <SearchContext.Provider
      value={{ searchQueries, setSearchQuery, clearSearchQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const contextUseSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchFilter must be used within a SearchProvider");
  }
  return context;
};
