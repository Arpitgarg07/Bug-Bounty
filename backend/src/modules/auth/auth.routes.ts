import { Router } from 'express'
import { authController } from './auth.controller'
import * as googleAuthController from './google-auth.controller'

const authRoutes = Router()

authRoutes.post('/register', authController.register)
authRoutes.post('/login', authController.login)

// Google OAuth routes
authRoutes.get('/google', googleAuthController.googleAuth)
authRoutes.get('/google/callback', googleAuthController.googleAuthCallback)

export { authRoutes }
