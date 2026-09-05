import type { Request, Response } from 'express'
import { asyncHandler } from '@common/utils/asyncHandler'
import { createSuccessResponse } from '@common/http/ApiResponse'
import { AppError } from '@common/errors/AppError'
import { companyService } from './company.service'
import { createCompanySchema } from './company.validation'

class CompanyController {
  createCompany = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
      throw new AppError('Unauthorized', {
        statusCode: 401,
        code: 'UNAUTHORIZED',
      })
    }

    const userId = user.id
    const input = createCompanySchema.parse(req.body)

    const company = await companyService.createCompany(userId, input)

    return res.status(201).json(createSuccessResponse(company))
  })

  getMyCompany = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
      throw new AppError('Unauthorized', {
        statusCode: 401,
        code: 'UNAUTHORIZED',
      })
    }

    const userId = user.id

    const company = await companyService.getMyCompany(userId)

    return res.status(200).json(createSuccessResponse(company))
  })
}

export const companyController = new CompanyController()
