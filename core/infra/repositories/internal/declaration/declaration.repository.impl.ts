import { DeclarationModel } from "@/core/domain/models/declaration.model";
import {
  declarationTable,
  SelectDeclaration,
} from "../../external/drizzle/schema";
import { fromJSDateToISO } from "@/shared/date";
import { IDeclarationRepository } from "@/core/application/interfaces/repository/declaration-repo.interface";
import { getDeclarationQuery } from "./declaration.query";
import { and, count, ilike, like, SQL } from "drizzle-orm";
import { mapFilterToExpr } from "../utils";
import { db } from "../../external/drizzle/database";

const defaultPagesize = 25;

export function parseDeclarationFrom(
  declaration: SelectDeclaration & Pick<DeclarationModel, "accountants">
): DeclarationModel {
  return {
    id: declaration.id,
    companyName: declaration.companyName,
    accountants: declaration.accountants,
    closingDate: fromJSDateToISO(declaration.closingDate as Date),
    internalDeadline: fromJSDateToISO(declaration.internalDeadLine as Date),
    status: declaration.status as DeclarationModel["status"],
    reportStatus: declaration.reportStatus as DeclarationModel["reportStatus"],
    ecValidation: declaration.ecValidation as DeclarationModel["ecValidation"],
    financialStatement:
      declaration.financialStatement as DeclarationModel["financialStatement"],
    legalForm: declaration.legalForm as DeclarationModel["legalForm"],
    report1: declaration.report1 as DeclarationModel["report1"],
    report2: declaration.report2 as DeclarationModel["report2"],
    revisionGuide:
      declaration.revisionGuide as DeclarationModel["revisionGuide"],
    taxDeclaration:
      declaration.taxDeclaration as DeclarationModel["taxDeclaration"],
    taxPayment: declaration.taxPayment as DeclarationModel["taxPayment"],
  };
}

export class DeclarationRepositoryImpl implements IDeclarationRepository {
  getMany: IDeclarationRepository["getMany"] = async (queries) => {
    const columnMap: Record<keyof DeclarationModel, unknown> = {
      id: declarationTable.id,
      accountants: undefined,
      closingDate: declarationTable.closingDate,
      internalDeadline: declarationTable.internalDeadLine,
      status: declarationTable.status,
      reportStatus: declarationTable.reportStatus,
      ecValidation: declarationTable.ecValidation,
      financialStatement: declarationTable.financialStatement,
      legalForm: declarationTable.legalForm,
      report1: declarationTable.report1,
      report2: declarationTable.report2,
      revisionGuide: declarationTable.revisionGuide,
      taxDeclaration: declarationTable.taxDeclaration,
      taxPayment: declarationTable.taxPayment,
      companyName: declarationTable.companyName,
    };

    const dbQuery = getDeclarationQuery();

    const conditions: SQL[] = [];

    const filters = queries?.filters ?? {};

    for (const key in filters) {
      if (["search", "query"].includes(key)) continue;

      const column = columnMap[key as keyof DeclarationModel];

      const filterArray = filters[
        key as keyof DeclarationModel
      ] as unknown as ModuleFilter[];

      filterArray?.forEach((filter) => {
        const expr = mapFilterToExpr(column as SQL<unknown>, filter);
        if (expr) conditions.push(expr);
      });
    }

    if (filters.search) {
      const searchValue = String(filters.search).trim();

      if (searchValue !== "") {
        const searchCondition = ilike(
          declarationTable.companyName,
          `%${searchValue}%`
        );
        conditions.push(searchCondition);
      }
    }

    const whereCondition = conditions.length ? and(...conditions) : undefined;

    const declarations = await dbQuery
      .where(whereCondition)
      .limit((queries?.pageSize || defaultPagesize) + 1)
      .offset(
        ((queries?.page || 1) - 1) * (queries?.pageSize || defaultPagesize)
      );

    const hasMore =
      declarations.length > (queries?.pageSize ?? defaultPagesize);
    const data = declarations.slice(0, queries?.pageSize || defaultPagesize);

    return {
      hasMore,
      data: (data || []).map((dec) =>
        parseDeclarationFrom({
          ...dec.declarationTable,
          accountants:
            dec.accoutants as unknown as DeclarationModel["accountants"],
        })
      ),
    };
  };

  getTotalCount: IDeclarationRepository["getTotalCount"] = async (
    queries?: FetchQuery<DeclarationModel>
  ) => {
    const c = await db.select({ count: count() }).from(declarationTable);

    return c[0].count;
  };
}
