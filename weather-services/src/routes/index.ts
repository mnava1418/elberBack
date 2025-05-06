import { Router, Request, Response, NextFunction } from 'express';
import weatherRoutes from './weather.route'
import { auth } from 'common-services'

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Elber Weather Services' });
})

router.use('/', auth.validateGateway, weatherRoutes)

export default router;