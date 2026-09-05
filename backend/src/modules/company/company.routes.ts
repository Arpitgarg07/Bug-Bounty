import { Router } from 'express'
import { authenticate } from '../auth/auth.middleware'
import { companyController } from './company.controller'

const companyRoutes = Router()

companyRoutes.post('/', authenticate, companyController.createCompany)
companyRoutes.get('/me', authenticate, companyController.getMyCompany)

export { companyRoutes }
