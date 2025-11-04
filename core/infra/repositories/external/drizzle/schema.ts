import {
  DeclarationStatus,
  LegalForm,
  ReportStatus,
} from "@/core/domain/models/declaration.model";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const ReportEnum = pgEnum("report_status", ReportStatus);
export const LegalFormEnum = pgEnum("legal_form", LegalForm);
export const DeclarationEnum = pgEnum(
  "declaration_enum_status",
  DeclarationStatus
);

export const declarationTable = pgTable("declaration_table", {
  id: text("id").unique().primaryKey(),
  companyName: text("company_name").notNull(),
  status: DeclarationEnum().default("ToDo"),
  reportStatus: ReportEnum().default("ToDo"),
  legalForm: LegalFormEnum().default("SA"),
  closingDate: timestamp("closing_date").defaultNow(),
  internalDeadLine: timestamp("internal_deadline").defaultNow(),
  revisionGuide: DeclarationEnum().default("ToDo"),
  ecValidation: DeclarationEnum().default("ToDo"),
  financialStatement: DeclarationEnum().default("ToDo"),
  taxDeclaration: DeclarationEnum().default("ToDo"),
  taxPayment: DeclarationEnum().default("ToDo"),
  report1: ReportEnum().default("ToDo"),
  report2: ReportEnum().default("ToDo"),
});

export const accountantTable = pgTable("accountant_table", {
  id: text("id").unique().primaryKey(),
  fullname: text("fullname"),
});

export const declarationAccoutantJointTable = pgTable(
  "declaration_accoutant_joint_table",
  {
    declarationId: text("declaration_id")
      .references(() => declarationTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    accoutantId: text("accoutant_id")
      .references(() => accountantTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
  }
);

export type SelectDeclaration = typeof declarationTable.$inferSelect;
export type InsertDeclaration = typeof declarationTable.$inferInsert;

export type SelectAccoutant = typeof accountantTable.$inferSelect;
export type InsertAccoutant = typeof accountantTable.$inferInsert;
