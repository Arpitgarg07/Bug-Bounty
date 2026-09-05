import { z } from "zod";

export const createReportSchema = z.object({
  programId: z.string().uuid(),
  title: z.string().min(5).max(220),
  summary: z.string().max(255).optional(),
  description: z.string().min(10).max(10000),
  reproductionSteps: z.string().max(10000).optional(),
  impact: z.string().max(10000).optional(),
  proofOfConcept: z.string().max(10000).optional(),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

export type CreateReportInput = z.infer<typeof createReportSchema>;
