import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { ListFilter, ArrowUp, ArrowDown } from "lucide-react";

type SortField =
  | "legalForm"
  | "accountants"
  | "closingDate"
  | "internalDeadline";
type SortOrder = "asc" | "desc";

export function SortButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("orderBy") as SortField | null;
  const currentOrder = searchParams.get("order") as SortOrder | null;

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentSort === field) {
      if (currentOrder === "asc") {
        params.set("order", "desc");
      } else if (currentOrder === "desc") {
        params.delete("orderBy");
        params.delete("order");
      } else {
        params.set("order", "asc");
      }
    } else {
      params.set("orderBy", field);
      params.set("order", "asc");
    }

    router.push(`?${params.toString()}`);
  };

  const getSortIcon = (field: SortField) => {
    if (currentSort !== field) return <ListFilter size={16} />;
    if (currentOrder === "asc") return <ArrowUp size={16} />;
    if (currentOrder === "desc") return <ArrowDown size={16} />;
    return <ListFilter size={16} />;
  };

  const isActive = (field: SortField) => currentSort === field;

  return (
    <div className="col-span-6 flex items-center gap-4">
      <Button
        variant={isActive("legalForm") ? "default" : "outline"}
        className="gap-2 py-2 text-sm"
        onClick={() => handleSort("legalForm")}
      >
        {getSortIcon("legalForm")} Forme
      </Button>
      <Button
        variant={isActive("accountants") ? "default" : "outline"}
        className="gap-2"
        onClick={() => handleSort("accountants")}
      >
        {getSortIcon("accountants")} Comptable
      </Button>
      <Button
        variant={isActive("closingDate") ? "default" : "outline"}
        className="gap-2"
        onClick={() => handleSort("closingDate")}
      >
        {getSortIcon("closingDate")} Fréquence
      </Button>
      <Button
        variant={isActive("internalDeadline") ? "default" : "outline"}
        className="gap-2"
        onClick={() => handleSort("internalDeadline")}
      >
        {getSortIcon("internalDeadline")} Échéance
      </Button>
    </div>
  );
}
