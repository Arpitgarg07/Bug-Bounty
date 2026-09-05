import type { Request, Response } from 'express'
import { AppError } from '@common/errors/AppError'
import { createSuccessResponse } from '@common/http/ApiResponse'
import { asyncHandler } from '@common/utils/asyncHandler'

const UNAUTHORIZED_STATUS_CODE = 401
const UNAUTHORIZED_CODE = 'UNAUTHORIZED'

type MeUser = {
  id: string
  email: string
  role: string
}

class MeController {
  getMe = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as MeUser | undefined

    if (!user) {
      throw new AppError('Unauthorized', {
        statusCode: UNAUTHORIZED_STATUS_CODE,
        code: UNAUTHORIZED_CODE,
      })
    }

    return res.status(200).json(
      createSuccessResponse({
        id: user.id,
        email: user.email,
        role: user.role,
      })
    )
  })
}

export const meController = new MeController()
