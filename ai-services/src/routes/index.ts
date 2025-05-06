import { Router, Request, Response, NextFunction } from 'express';
import chatRoutes from './chatRoutes'
import { auth } from 'common-services'

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Elber AI Services' });
});

router.use('/chat', auth.validateGateway, chatRoutes)

export default router;
