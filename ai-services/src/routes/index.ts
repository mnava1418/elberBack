import { Router, Request, Response, NextFunction } from 'express';
import dialogFlowRoutes from './dialogFlowRoutes'
import chatRoutes from './chatRoutes'

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, world!');
});

router.use('/dialog', dialogFlowRoutes)
router.use('/chat', chatRoutes)

export default router;
