import type { Request, Response } from 'express'
import { AppError } from '@common/errors/AppError'
import { asyncHandler } from '@common/utils/asyncHandler'
import { createSuccessResponse } from '@common/http/ApiResponse'
import { reportService } from './report.service'
import { createReportSchema } from './report.validation'

const UNAUTHORIZED_STATUS_CODE = 401
const UNAUTHORIZED_CODE = 'UNAUTHORIZED'

class ReportController {
  createReport = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
      throw new AppError('Unauthorized', {
        statusCode: UNAUTHORIZED_STATUS_CODE,
        code: UNAUTHORIZED_CODE,
      })
    }

    const input = createReportSchema.parse(req.body)
    const report = await reportService.createReport(user.id, input)

    return res.status(201).json(createSuccessResponse(report))
  })

  getMyReports = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
      throw new AppError('Unauthorized', {
        statusCode: UNAUTHORIZED_STATUS_CODE,
        code: UNAUTHORIZED_CODE,
      })
    }

    const reports = await reportService.getReportsByUserId(user.id)
    return res.status(200).json(createSuccessResponse(reports))
  })

  getReport = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
      throw new AppError('Unauthorized', {
        statusCode: UNAUTHORIZED_STATUS_CODE,
        code: UNAUTHORIZED_CODE,
      })
    }

    const { id } = req.params
    const report = await reportService.getReportById(id, user.id)

    if (!report) {
      throw new AppError('Report not found', {
        statusCode: 404,
        code: 'REPORT_NOT_FOUND',
      })
    }

    return res.status(200).json(createSuccessResponse(report))
  })
}

export const reportController = new ReportController()
