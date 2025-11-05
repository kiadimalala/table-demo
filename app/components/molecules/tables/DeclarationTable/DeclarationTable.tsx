"use client";
import DataTable from "@/app/components/atoms/Datatable/DataTable";
import React from "react";
import { DeclarationColumns } from "./DeclarationColumn";
import { DeclarationModel } from "@/core/domain/models/declaration.model";

export type DeclarationTableProps = {
  data: DeclarationModel[];
  hasMore: boolean;
  totalCount: number;
};

const DeclarationTable = (props: DeclarationTableProps) => {
  const pagination = {
    hasMore: props.hasMore,
    total: props.data.length,
  };
  return (
    <DataTable
      {...props}
      columns={DeclarationColumns}
      pagination={pagination}
    />
  );
};

export default DeclarationTable;
