import { z } from "zod";
import { AccoutantSchema } from "./accoutant.model";

export const DeclarationStatus = [
  "ToDo",
  "ToDeclare",
  "Accepted",
  "Rejected",
] as const;
export const ReportStatus = ["Open", "Validated", "Finalized", "ToDo"] as const;
export const LegalForm = ["SAS", "SARL", "SA", "SCI"] as const;

export const DeclarationSchema = z.object({
  id: z.string(),
  companyName: z.string(),
  status: z.enum(DeclarationStatus),
  reportStatus: z.enum(ReportStatus),
  accountants: z.array(AccoutantSchema),
  legalForm: z.enum(LegalForm),
  closingDate: z.string(),
  internalDeadline: z.string(),
  revisionGuide: z.enum(DeclarationStatus),
  ecValidation: z.enum(DeclarationStatus),
  financialStatement: z.enum(DeclarationStatus),
  taxDeclaration: z.enum(DeclarationStatus),
  taxPayment: z.enum(DeclarationStatus),
  report1: z.enum(ReportStatus),
  report2: z.enum(ReportStatus),
});

export type DeclarationModel = z.infer<typeof DeclarationSchema>;

export type AccoutantModel = z.infer<typeof AccoutantSchema>;
