import { Router } from 'express'
import { authenticate } from '../auth/auth.middleware'
import { programActivationController } from './program.activation.controller'

const programActivationRoutes = Router()

programActivationRoutes.patch('/:id/activate', authenticate, programActivationController.activateProgram)

export { programActivationRoutes }
