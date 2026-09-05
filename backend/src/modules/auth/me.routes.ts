import { Router } from 'express'
import { authenticate } from './auth.middleware'
import { meController } from './me.controller'

const meRoutes = Router()

meRoutes.get('/me', authenticate, meController.getMe)

export { meRoutes }
