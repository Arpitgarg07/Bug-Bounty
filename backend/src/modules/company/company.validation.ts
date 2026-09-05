import { z } from 'zod'

export const createCompanySchema = z.object({
  companyName: z.string().trim().min(2).max(150),
  website: z.string().url(),
  description: z.string().trim().min(20).max(2000),
  contactEmail: z.string().email(),
})

export const updateCompanySchema = createCompanySchema.partial()

export type CreateCompanyInput = z.infer<typeof createCompanySchema>
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>
