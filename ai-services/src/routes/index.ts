import { Router, Request, Response, NextFunction } from 'express';
import chatRoutes from './chatRoutes'
import authController from '../controllers/authController';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Elber AI Services' });
});

router.use('/chat', authController.validateGateway, chatRoutes)

export default router;
