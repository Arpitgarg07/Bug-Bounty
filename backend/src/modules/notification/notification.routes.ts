import { Router } from 'express';
import * as notificationController from './notification.controller';

const router = Router();

router.post('/subscribe', notificationController.subscribe);

export const notificationRoutes = router;
