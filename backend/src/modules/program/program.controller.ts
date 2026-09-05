import type { Request, Response } from 'express'
import { AppError } from '@common/errors/AppError'
import { asyncHandler } from '@common/utils/asyncHandler'
import { createSuccessResponse } from '@common/http/ApiResponse'
import { programService } from './program.service'
import { createProgramSchema } from './program.validation'

const UNAUTHORIZED_STATUS_CODE = 401
const UNAUTHORIZED_CODE = 'UNAUTHORIZED'

class ProgramController {
  createProgram = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
      throw new AppError('Unauthorized', {
        statusCode: UNAUTHORIZED_STATUS_CODE,
        code: UNAUTHORIZED_CODE,
      })
    }

    const userId = user.id
    const input = createProgramSchema.parse(req.body)
    const program = await programService.createProgram(userId, input)

    return res.status(201).json(createSuccessResponse(program))
  })

  listPrograms = asyncHandler(async (req: Request, res: Response) => {
    const programs = await programService.listPrograms()
    return res.status(200).json(createSuccessResponse(programs))
  })

  getProgram = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const program = await programService.getProgramById(id)

    if (!program) {
      throw new AppError('Program not found', {
        statusCode: 404,
        code: 'PROGRAM_NOT_FOUND',
      })
    }

    return res.status(200).json(createSuccessResponse(program))
  })
}

export const programController = new ProgramController()
