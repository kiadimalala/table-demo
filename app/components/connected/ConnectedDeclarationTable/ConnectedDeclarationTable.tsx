import {
  getDeclarationCount,
  getDeclarationList,
} from "@/app/actions/declarations.action";
import React from "react";
import DeclarationTable from "@/app/components/molecules/tables/DeclarationTable/DeclarationTable";
import { DeclarationModel } from "@/core/domain/models/declaration.model";

export type ConnectedDeclarationTableProps = {
  page?: number;
  pageSize?: number;
};

const ConnectedDeclarationTable = async ({
  page,
  pageSize,
}: ConnectedDeclarationTableProps) => {
  const [, declarations] = await getDeclarationList({
    page,
    pageSize,
  } as FetchQuery<DeclarationModel>);

  const { data, hasMore } = declarations!;

  const [, count] = await getDeclarationCount();

  return (
    <DeclarationTable
      totalCount={count as number}
      hasMore={hasMore}
      data={data || []}
    />
  );
};

export default ConnectedDeclarationTable;
