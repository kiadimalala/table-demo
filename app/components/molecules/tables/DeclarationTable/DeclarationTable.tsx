"use client";
import DataTable from "@/app/components/atoms/Datatable/DataTable";
import React from "react";
import { DeclarationColumns } from "./DeclarationColumn";
import { DeclarationModel } from "@/core/domain/models/declaration.model";

export type DeclarationTableProps = {
  data: DeclarationModel[];
};

const DeclarationTable = (props: DeclarationTableProps) => {
  return <DataTable {...props} columns={DeclarationColumns} />;
};

export default DeclarationTable;
