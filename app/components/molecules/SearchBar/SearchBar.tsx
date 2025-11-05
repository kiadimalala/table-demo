import React from "react";
import { Button } from "../../ui/button";
import { ListFilter, Search } from "lucide-react";
import { Input } from "../../ui/input";

const SearchBar = () => {
  return (
    <div className="grid grid-flow-col grid-cols-12 gap-4 mb-6">
      <div className="relative flex col-span-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input placeholder="Trouver un client" className="pl-10" />
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
