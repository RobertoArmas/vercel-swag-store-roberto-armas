"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchContext = createContext<{
  queryParameters: URLSearchParams;
  setQueryParameters: (queryParameters: URLSearchParams) => void;
  isLoading: boolean;
}>({
  queryParameters: new URLSearchParams(),
  setQueryParameters: () => {},
  isLoading: false,
});

export const useSearch = () => {
  return useContext(SearchContext);
};

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryParameters, setQueryParameters] =
    useState<URLSearchParams>(searchParams);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      router.push(`/search?${queryParameters.toString()}`);
    });
  }, [queryParameters, router]);
  return (
    <SearchContext.Provider
      value={{ queryParameters, setQueryParameters, isLoading: isPending }}
    >
      {children}
    </SearchContext.Provider>
  );
}
