import type { Request, Response } from 'express'
import { AppError } from '@common/errors/AppError'
import { asyncHandler } from '@common/utils/asyncHandler'
import { createSuccessResponse } from '@common/http/ApiResponse'
import { programActivationService } from './program.activation.service'

const UNAUTHORIZED_STATUS_CODE = 401
const UNAUTHORIZED_CODE = 'UNAUTHORIZED'
const NOT_FOUND_STATUS_CODE = 404
const PROGRAM_NOT_FOUND_CODE = 'PROGRAM_NOT_FOUND'

class ProgramActivationController {
  activateProgram = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
      throw new AppError('Unauthorized', {
        statusCode: UNAUTHORIZED_STATUS_CODE,
        code: UNAUTHORIZED_CODE,
      })
    }

    const programId = req.params.id

    if (typeof programId !== 'string') {
      throw new AppError('Program not found', {
        statusCode: NOT_FOUND_STATUS_CODE,
        code: PROGRAM_NOT_FOUND_CODE,
      })
    }

    const program = await programActivationService.activateProgram(user.id, programId)

    return res.status(200).json(createSuccessResponse(program))
  })
}

export const programActivationController = new ProgramActivationController()
