import { getDeclarationList } from "@/app/actions/declarations.action";
import React from "react";
import DeclarationTable from "@/app/components/molecules/tables/DeclarationTable/DeclarationTable";

const ConnectedDeclarationTable = async () => {
  const [, declarations] = await getDeclarationList();
  return <DeclarationTable data={declarations || []} />;
};

export default ConnectedDeclarationTable;
