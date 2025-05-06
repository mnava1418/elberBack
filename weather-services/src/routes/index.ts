import { Router, Request, Response, NextFunction } from 'express';
import weatherRoutes from './weather.route'
import * as authController from '../controllers/auth.controller'

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Elber Weather Services' });
})

router.use('/', authController.validateGateway, weatherRoutes)

export default router;