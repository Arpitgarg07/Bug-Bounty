import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '@config/env'
import { AppError } from '@common/errors/AppError'

type AuthTokenPayload = {
  sub: string
  email: string
  role: string
}

type AuthenticatedRequestUser = {
  id: string
  email: string
  role: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedRequestUser
    }
  }
}

const UNAUTHORIZED_STATUS_CODE = 401
const UNAUTHORIZED_CODE = 'UNAUTHORIZED'

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authorizationHeader = req.header('authorization')

  console.log('AUTH HEADER:', authorizationHeader)

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    next(
      new AppError('Unauthorized', {
        statusCode: UNAUTHORIZED_STATUS_CODE,
        code: UNAUTHORIZED_CODE,
      })
    )
    return
  }

  const token = authorizationHeader.slice('Bearer '.length).trim()

  if (!token) {
    next(
      new AppError('Unauthorized', {
        statusCode: UNAUTHORIZED_STATUS_CODE,
        code: UNAUTHORIZED_CODE,
      })
    )
    return
  }

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET)

    if (typeof decoded === 'string' || !decoded || typeof decoded !== 'object') {
      throw new Error('Invalid token payload')
    }

    const payload = decoded as AuthTokenPayload

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    }

    next()
  } catch (error) {
    console.error('JWT VERIFY ERROR:', error)

    next(
      new AppError('Unauthorized', {
        statusCode: UNAUTHORIZED_STATUS_CODE,
        code: UNAUTHORIZED_CODE,
      })
    )
  }
}
