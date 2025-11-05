"use client";
import DataTable from "@/app/components/atoms/Datatable/DataTable";
import React from "react";
import { DeclarationColumns } from "./DeclarationColumn";
import { DeclarationModel } from "@/core/domain/models/declaration.model";
import Stats from "@/app/components/molecules/Stats/Stats";
import SearchBar from "@/app/components/molecules/SearchBar/SearchBar";

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
    <>
      <Stats data={props.data} />
      <SearchBar />
      <DataTable
        {...props}
        columns={DeclarationColumns}
        pagination={pagination}
      />
    </>
  );
};

export default DeclarationTable;
