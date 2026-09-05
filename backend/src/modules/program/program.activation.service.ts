import { ProgramStatus } from '@prisma/client'
import { prisma } from '@config/prisma'
import { AppError } from '@common/errors/AppError'

const NOT_FOUND_STATUS_CODE = 404
const FORBIDDEN_STATUS_CODE = 403
const PROGRAM_NOT_FOUND_CODE = 'PROGRAM_NOT_FOUND'
const FORBIDDEN_CODE = 'FORBIDDEN'

export class ProgramActivationService {
  public async activateProgram(userId: string, programId: string) {
    const program = await prisma.program.findUnique({
      where: {
        id: programId,
      },
      include: {
        company: true,
      },
    })

    if (!program) {
      throw new AppError('Program not found', {
        statusCode: NOT_FOUND_STATUS_CODE,
        code: PROGRAM_NOT_FOUND_CODE,
      })
    }

    if (program.company.ownerUserId !== userId) {
      throw new AppError('Forbidden', {
        statusCode: FORBIDDEN_STATUS_CODE,
        code: FORBIDDEN_CODE,
      })
    }

    const updatedProgram = await prisma.program.update({
      where: {
        id: programId,
      },
      data: {
        status: ProgramStatus.ACTIVE,
      },
    })

    return updatedProgram
  }
}

export const programActivationService = new ProgramActivationService()
