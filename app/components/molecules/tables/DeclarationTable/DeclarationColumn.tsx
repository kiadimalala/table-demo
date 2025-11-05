import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import {
  DeclarationModel,
  DeclarationStatusLabels,
  ReportStatusLabels,
} from "@/core/domain/models/declaration.model";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/components/ui/badge";

const getStatusBadge = (status: DeclarationModel["status"]) => {
  const styles = {
    ToDo: "bg-gray-100 text-gray-700 border border-gray-300",
    ToDeclare: "bg-blue-100 text-blue-700 border border-blue-300",
    Accepted: "bg-green-100 text-green-700 border border-green-300",
    Rejected: "bg-red-100 text-red-700 border border-red-300",
  };
  return (
    <Badge
      className={`${styles[status]} font-normal text-xs hover:bg-transparent`}
    >
      {DeclarationStatusLabels[status]}
    </Badge>
  );
};

const getPlaquetteBadge = (status: DeclarationModel["reportStatus"]) => {
  const styles = {
    Open: "bg-blue-100 text-blue-700 border border-blue-300",
    Validated: "bg-green-100 text-green-700 border border-green-300",
    Finalized: "bg-green-100 text-green-700 border border-green-300",
    ToDo: "bg-gray-100 text-gray-700 border border-gray-300",
  };
  return (
    <Badge
      className={`${styles[status]} font-normal text-xs hover:bg-transparent`}
    >
      {ReportStatusLabels[status]}
    </Badge>
  );
};

export const DeclarationColumns: ColumnDef<DeclarationModel>[] = [
  {
    accessorKey: "company_name",
    header: "Raison social",
    cell: ({ row: { original } }) => <span>{original.companyName}</span>,
  },
  {
    accessorKey: "legal_form",
    header: "Forme",
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
  {
    accessorKey: "accoutants",
    header: "Comptable",
    cell: ({ row: { original } }) => (
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        {original.accountants.map((ac) => {
          // Safely create initials from fullname, handle all possibilities
          let fallback: string;
          if (!ac.fullname || typeof ac.fullname !== "string") {
            fallback = "";
          } else {
            const trimmed = ac.fullname.trim();
            if (trimmed.length === 0) {
              fallback = "";
            } else {
              const parts = trimmed.split(/\s+/).filter(Boolean);
              if (parts.length === 0) {
                fallback = "";
              } else if (parts.length === 1) {
                fallback = parts[0][0]?.toUpperCase() || "";
              } else {
                fallback =
                  (parts[0][0] || "").toUpperCase() +
                  (parts[parts.length - 1][0] || "").toUpperCase();
              }
            }
          }

          return (
            <Avatar className="w-8 h-8" key={ac.id}>
              <AvatarFallback
                className="font-semibold !text-primary-foreground"
                style={{
                  backgroundColor: `hsl(${Math.floor(
                    Math.random() * 360
                  )}, 70%, 80%)`,
                  color: "#363636",
                }}
              >
                {fallback}
              </AvatarFallback>
            </Avatar>
          );
        })}
      </div>
    ),
  },
  {
    accessorKey: "closing_date",
    header: "Clôture",
    cell: ({ row: { original } }) => (
      <span>{format(new Date(original.closingDate), "dd/mm/yyyy")}</span>
    ),
  },
  {
    accessorKey: "interna_deadline",
    header: "Echeance interne",
    cell: ({ row: { original } }) => (
      <span>
        {format(new Date(original.internalDeadline), "dd/mm/yyyy") || "-"}
      </span>
    ),
  },
  {
    accessorKey: "revision_guide",
    header: "Guide de révision",
    cell: ({ row: { original } }) => (
      <span>{getStatusBadge(original.revisionGuide)}</span>
    ),
  },
  {
    accessorKey: "ec_validation",
    header: "Validation EC",
    cell: ({ row: { original } }) => (
      <span>{getStatusBadge(original.ecValidation)}</span>
    ),
  },
  {
    accessorKey: "financial_statement",
    header: "Liasse",
    cell: ({ row: { original } }) => (
      <span>{getStatusBadge(original.financialStatement)}</span>
    ),
  },
  {
    accessorKey: "tax_declaration",
    header: "Déclaration IS",
    cell: ({ row: { original } }) => (
      <span>{getStatusBadge(original.taxDeclaration)}</span>
    ),
  },
  {
    accessorKey: "tax_payment",
    header: "Paiement ID",
    cell: ({ row: { original } }) => (
      <span>{getStatusBadge(original.taxPayment)}</span>
    ),
  },
  {
    accessorKey: "report_1",
    header: "Plaquette",
    cell: ({ row: { original } }) => (
      <span>{getPlaquetteBadge(original.report1)}</span>
    ),
  },
  {
    accessorKey: "report_2",
    header: "Plaquette",
    cell: ({ row: { original } }) => (
      <span>{getPlaquetteBadge(original.report2)}</span>
    ),
  },
];
