import { Router, Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config';
import authController from '../controllers/auth.controller';

const paths = config.paths
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Elber API Gateway' });
});

router.use('/ai', authController.validateToken, createProxyMiddleware({
  target: paths.ai_services,
  changeOrigin: true,
  pathRewrite: { '/ai': '/'}
}))

export default router;
