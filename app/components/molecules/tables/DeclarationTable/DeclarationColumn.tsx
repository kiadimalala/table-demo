import { DeclarationModel } from "@/core/domain/models/declaration.model";
import { ColumnDef } from "@tanstack/react-table";

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
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
  {
    accessorKey: "closing_date",
    header: "Clôture",
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
  {
    accessorKey: "interna_deadline",
    header: "Echeance interne",
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
  {
    accessorKey: "revision_guide",
    header: "Guide de révision",
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
  {
    accessorKey: "ec_validation",
    header: "Validation EC",
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
  {
    accessorKey: "financial_statement",
    header: "Liasse",
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
  {
    accessorKey: "tax_declaration",
    header: "Déclaration IS",
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
  {
    accessorKey: "tax_payment",
    header: "Paiement ID",
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
  {
    accessorKey: "report_1",
    header: "Plaquette",
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
  {
    accessorKey: "report_2",
    header: "Plaquette",
    cell: ({ row: { original } }) => <span>{original.legalForm}</span>,
  },
];
