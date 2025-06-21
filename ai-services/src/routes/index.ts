import { Router, Request, Response, NextFunction } from 'express';
import chatRoutes from './chatRoutes'

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Elber AI Services' });
});

router.use('/chat', chatRoutes)

export default router;
