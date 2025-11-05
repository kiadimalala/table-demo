"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { ListFilter, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedQuery.trim() === "") {
      params.delete("search");
    } else {
      params.set("search", debouncedQuery);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className="grid grid-flow-col grid-cols-12 gap-4 mb-6">
      <div className="relative flex col-span-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Trouver un client"
          className="pl-10"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="col-span-6 flex items-center gap-4">
        <Button variant="outline" className="gap-2 py-2 text-sm">
          <ListFilter size={16} /> Forme
        </Button>
        <Button variant="outline" className="gap-2">
          <ListFilter size={16} /> Comptable
        </Button>
        <Button variant="outline" className="gap-2">
          <ListFilter size={16} /> Fréquence
        </Button>
        <Button variant="outline" className="gap-2">
          <ListFilter size={16} /> Échéance
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-2 col-span-2">
        <span className="text-sm text-gray-600">Mode analytique</span>
        <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
          <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
