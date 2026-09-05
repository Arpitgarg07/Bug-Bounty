import { Router } from 'express'
import { authenticate } from '../auth/auth.middleware'
import { reportController } from './report.controller'

const reportRoutes = Router()

reportRoutes.post('/', authenticate, reportController.createReport)
reportRoutes.get('/my', authenticate, reportController.getMyReports)
reportRoutes.get('/:id', authenticate, reportController.getReport)

export { reportRoutes }
