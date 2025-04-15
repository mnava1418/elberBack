import { Router, Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware'
import paths from '../config/paths';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Elber API Gateway' });
});

router.use('/ai', createProxyMiddleware({
  target: paths.ai_services,
  changeOrigin: true,
  pathRewrite: { '/ai': '/'}
}))

export default router;
