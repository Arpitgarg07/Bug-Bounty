import type { NextFunction, Request, Response } from 'express'
import { AppError } from '@common/errors/AppError'

const UNAUTHORIZED_STATUS_CODE = 401
const FORBIDDEN_STATUS_CODE = 403
const UNAUTHORIZED_CODE = 'UNAUTHORIZED'
const FORBIDDEN_CODE = 'FORBIDDEN'

export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = req.user

    if (!user) {
      next(
        new AppError('Unauthorized', {
          statusCode: UNAUTHORIZED_STATUS_CODE,
          code: UNAUTHORIZED_CODE,
        })
      )
      return
    }

    if (!roles.includes(user.role)) {
      next(
        new AppError('Forbidden', {
          statusCode: FORBIDDEN_STATUS_CODE,
          code: FORBIDDEN_CODE,
        })
      )
      return
    }

    next()
  }
}
