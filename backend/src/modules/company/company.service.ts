import { randomUUID } from 'node:crypto'
import { CompanyStatus } from '@prisma/client'
import { prisma } from '@config/prisma'
import { AppError } from '@common/errors/AppError'
import type { CreateCompanyInput } from './company.validation'

const CONFLICT_STATUS_CODE = 409
const NOT_FOUND_STATUS_CODE = 404
const COMPANY_ALREADY_EXISTS_CODE = 'COMPANY_ALREADY_EXISTS'
const COMPANY_NOT_FOUND_CODE = 'COMPANY_NOT_FOUND'

const createSlug = (companyName: string, userId: string): string => {
  const baseSlug = companyName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const uniqueSuffix = userId.replace(/-/g, '').slice(0, 8) || randomUUID().replace(/-/g, '').slice(0, 8)

  return `${baseSlug}-${uniqueSuffix}`
}

export class CompanyService {
  public async createCompany(userId: string, input: CreateCompanyInput) {
    const existingCompany = await prisma.company.findFirst({
      where: {
        ownerUserId: userId,
        deletedAt: null,
      },
    })

    if (existingCompany) {
      throw new AppError('Company already exists', {
        statusCode: CONFLICT_STATUS_CODE,
        code: COMPANY_ALREADY_EXISTS_CODE,
      })
    }

    const company = await prisma.company.create({
      data: {
        ownerUserId: userId,
        name: input.companyName,
        slug: createSlug(input.companyName, userId),
        websiteUrl: input.website,
        description: input.description,
        status: CompanyStatus.PENDING_VERIFICATION,
      },
    })

    return company
  }

  public async getMyCompany(userId: string) {
    const company = await prisma.company.findFirst({
      where: {
        ownerUserId: userId,
        deletedAt: null,
      },
    })

    if (!company) {
      throw new AppError('Company not found', {
        statusCode: NOT_FOUND_STATUS_CODE,
        code: COMPANY_NOT_FOUND_CODE,
      })
    }

    return company
  }
}

export const companyService = new CompanyService()
