import { z } from "zod";

export const AccoutantSchema = z.object({
  id: z.string(),
  fullname: z.string().min(1, { message: "min" }),
});

export type AccoutantModel = z.infer<typeof AccoutantSchema>;
