import { Router, Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config';
import authController from '../controllers/auth.controller';
import { proxy } from 'common-services'

const paths = config.paths
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Elber API Gateway' });
});

router.use('/ai', authController.validateToken, createProxyMiddleware({
  target: paths.ai_services,
  changeOrigin: true,
  pathRewrite: { '/ai': '/'},
  on: {
    proxyReq: proxy.proxy_request
  }  
}))

router.use('/weather', authController.validateToken, createProxyMiddleware({
  target: paths.weather_services,
  changeOrigin: true,
  pathRewrite: { '/weather': '/'},
  on: {
    proxyReq: proxy.proxy_request
  }  
}))

router.use('/auth', createProxyMiddleware({
  target: paths.auth_services,
  changeOrigin: true,
  pathRewrite: { '/auth':'/' },
  on: {
    proxyReq: proxy.proxy_request
  }
}))

export default router;
