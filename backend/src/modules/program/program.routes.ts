import { Router } from 'express'
import { authenticate } from '../auth/auth.middleware'
import { programController } from './program.controller'

const programRoutes = Router()

programRoutes.post('/', authenticate, programController.createProgram)
programRoutes.get('/', programController.listPrograms)
programRoutes.get('/:id', programController.getProgram)

export { programRoutes }
