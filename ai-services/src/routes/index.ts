import { Router, Request, Response, NextFunction } from 'express';
import chatRoutes from './chatRoutes'

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, world!');
});

router.use('/chat', chatRoutes)

export default router;
