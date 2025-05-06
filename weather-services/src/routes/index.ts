import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Elber Weather Services' });
})

export default router;