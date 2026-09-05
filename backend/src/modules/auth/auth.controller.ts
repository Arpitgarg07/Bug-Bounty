import type { Request, Response } from 'express'
import { registerSchema, loginSchema } from './auth.validation'
import { authService } from './auth.service'
import { createSuccessResponse } from '@common/http/ApiResponse'
import { asyncHandler } from '@common/utils/asyncHandler'
import type { RegisterResult, LoginResult } from './auth.types'

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const input = registerSchema.parse(req.body)

    const result = (await authService.register(input)) as RegisterResult

    return res.status(201).json(createSuccessResponse(result))
  })

  login = asyncHandler(async (req: Request, res: Response) => {
    const input = loginSchema.parse(req.body)

    const result = (await authService.login(input)) as LoginResult

    return res.status(200).json(createSuccessResponse(result))
  })
}

export const authController = new AuthController()
