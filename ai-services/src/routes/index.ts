import { Router, Request, Response, NextFunction } from 'express';
import dialogFlowRoutes from './dialogFlowRoutes'

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, world!');
});

router.use('/dialog', dialogFlowRoutes)

export default router;
