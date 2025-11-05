import {
  getDeclarationCount,
  getDeclarationList,
} from "@/app/actions/declarations.action";
import React from "react";
import DeclarationTable from "@/app/components/molecules/tables/DeclarationTable/DeclarationTable";
import { DeclarationModel } from "@/core/domain/models/declaration.model";

export type ConnectedDeclarationTableProps = {
  searchParams?: RouteQuery["searchParams"];
};

const ConnectedDeclarationTable = async ({
  searchParams,
}: ConnectedDeclarationTableProps) => {
  const query = {
    page: searchParams?.page ? Number(searchParams.page) : 1,
    pageSize: searchParams?.pageSize ? Number(searchParams.pageSize) : 25,
    filters: { ...searchParams?.filters, search: searchParams?.search },
    orderBy: searchParams?.orderBy,
    order: searchParams?.order,
  };

  const [, declarations] = await getDeclarationList(
    query as FetchQuery<DeclarationModel>
  );

  const { data, hasMore } = declarations!;

  const [, count] = await getDeclarationCount();

  const pageCount = searchParams?.search ? data.length : count;

  return (
    <DeclarationTable
      totalCount={pageCount as number}
      hasMore={hasMore}
      data={data || []}
    />
  );
};

export default ConnectedDeclarationTable;
