import { z } from 'zod'

export const createProgramSchema = z
  .object({
    name: z.string().trim().min(2).max(180),
    summary: z.string().trim().max(255).optional(),
    description: z.string().trim().max(10000).optional(),
    visibility: z.enum(['PUBLIC', 'PRIVATE']),
    websiteUrl: z.string().url().optional(),
    policyUrl: z.string().url().optional(),
    instructions: z.string().trim().max(10000).optional(),
    currency: z.string().trim().length(3).default('USD'),
    minBountyAmount: z.number().positive().optional(),
    maxBountyAmount: z.number().positive().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.minBountyAmount !== undefined && data.maxBountyAmount !== undefined && data.maxBountyAmount < data.minBountyAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['maxBountyAmount'],
        message: 'maxBountyAmount must be greater than or equal to minBountyAmount',
      })
    }
  })

export type CreateProgramInput = z.infer<typeof createProgramSchema>
