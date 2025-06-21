import { Router, Request, Response, NextFunction } from 'express';
import authController from '../controllers/auth.controller';
import authRoutes from './auth.routes';
import aiRoutes from './ai.routes';
import socketRoutes from './socket.routes';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Elber API Gateway' });
});

router.use('/ai', authController.validateToken, aiRoutes())
router.use('/socket.io', authController.validateToken, socketRoutes())
router.use('/auth', authRoutes())

export default router;
