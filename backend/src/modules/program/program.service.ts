import { randomUUID } from 'node:crypto'
import { ProgramStatus } from '@prisma/client'
import { prisma } from '@config/prisma'
import { AppError } from '@common/errors/AppError'
import type { CreateProgramInput } from './program.validation'

const FORBIDDEN_STATUS_CODE = 403
const COMPANY_REQUIRED_CODE = 'COMPANY_REQUIRED'

const createSlug = (name: string, userId: string): string => {
  const baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const uniqueSuffix = userId.replace(/-/g, '').slice(0, 8) || randomUUID().replace(/-/g, '').slice(0, 8)

  return `${baseSlug}-${uniqueSuffix}`
}

export class ProgramService {
  public async createProgram(userId: string, input: CreateProgramInput) {
    const company = await prisma.company.findFirst({
      where: {
        ownerUserId: userId,
        deletedAt: null,
      },
    })

    if (!company) {
      throw new AppError('Company required', {
        statusCode: FORBIDDEN_STATUS_CODE,
        code: COMPANY_REQUIRED_CODE,
      })
    }

    const program = await prisma.program.create({
      data: {
        companyId: company.id,
        createdByUserId: userId,
        name: input.name,
        slug: createSlug(input.name, userId),
        summary: input.summary,
        description: input.description,
        visibility: input.visibility,
        websiteUrl: input.websiteUrl,
        policyUrl: input.policyUrl,
        instructions: input.instructions,
        currency: input.currency,
        minBountyAmount: input.minBountyAmount,
        maxBountyAmount: input.maxBountyAmount,
        status: ProgramStatus.DRAFT,
      },
    })

    return program
  }

  public async listPrograms() {
    const programs = await prisma.program.findMany({
      where: {
        deletedAt: null,
        status: ProgramStatus.ACTIVE,
        visibility: 'PUBLIC',
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return programs
  }

  public async getProgramById(id: string) {
    const program = await prisma.program.findUnique({
      where: { id, deletedAt: null },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            website: true,
          },
        },
      },
    })

    return program
  }
}

export const programService = new ProgramService()
