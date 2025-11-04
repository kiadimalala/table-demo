import { eq, sql } from "drizzle-orm";
import { db } from "../../external/drizzle/database";
import {
  accountantTable,
  declarationAccoutantJointTable,
  declarationTable,
} from "../../external/drizzle/schema";
import { AccoutantModel } from "@/core/domain/models/accoutant.model";

export function getDeclarationQuery() {
  return db
    .select({
      declarationTable,
      accoutants: sql<AccoutantModel[]>`
            COALESCE(JSONB_AGG(DISTINCT TO_JSONB(${accountantTable})) FILTER (WHERE ${accountantTable.id} IS NOT NULL), '[]')
        `.as("accoutants"),
    })
    .from(declarationTable)
    .leftJoin(
      declarationAccoutantJointTable,
      eq(declarationTable.id, declarationAccoutantJointTable.declarationId)
    )
    .leftJoin(
      accountantTable,
      eq(accountantTable.id, declarationAccoutantJointTable.accoutantId)
    )
    .groupBy(declarationTable.id);
}
