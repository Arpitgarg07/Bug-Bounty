import { randomUUID } from 'node:crypto'
import { ProgramStatus, ReportStatus } from '@prisma/client'
import { prisma } from '@config/prisma'
import { AppError } from '@common/errors/AppError'
import type { CreateReportInput } from './report.validation'

const NOT_FOUND_STATUS_CODE = 404
const FORBIDDEN_STATUS_CODE = 403
const PROGRAM_NOT_FOUND_CODE = 'PROGRAM_NOT_FOUND'
const PROGRAM_NOT_ACTIVE_CODE = 'PROGRAM_NOT_ACTIVE'

export class ReportService {
  public async createReport(userId: string, input: CreateReportInput) {
    const program = await prisma.program.findFirst({
      where: {
        id: input.programId,
        deletedAt: null,
      },
    })

    if (!program) {
      throw new AppError('Program not found', {
        statusCode: NOT_FOUND_STATUS_CODE,
        code: PROGRAM_NOT_FOUND_CODE,
      })
    }

    if (program.status !== ProgramStatus.ACTIVE) {
      throw new AppError('Program not active', {
        statusCode: FORBIDDEN_STATUS_CODE,
        code: PROGRAM_NOT_ACTIVE_CODE,
      })
    }

    const referenceCode = `RPT-${randomUUID().replace(/-/g, '').slice(0, 10).toUpperCase()}`

    const report = await prisma.report.create({
      data: {
        programId: input.programId,
        reporterUserId: userId,
        referenceCode,
        title: input.title,
        summary: input.summary,
        description: input.description,
        reproductionSteps: input.reproductionSteps,
        impact: input.impact,
        proofOfConcept: input.proofOfConcept,
        severity: input.severity,
        status: ReportStatus.SUBMITTED,
      },
    })

    return report
  }

  public async getReportsByUserId(userId: string) {
    const reports = await prisma.report.findMany({
      where: {
        reporterUserId: userId,
        deletedAt: null,
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
            slug: true,
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return reports
  }

  public async getReportById(id: string, userId: string) {
    const report = await prisma.report.findFirst({
      where: {
        id,
        reporterUserId: userId,
        deletedAt: null,
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
            slug: true,
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
                website: true,
              },
            },
          },
        },
      },
    })

    return report
  }
}

export const reportService = new ReportService()
