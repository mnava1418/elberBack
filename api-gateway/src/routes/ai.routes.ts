import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config';
import { proxy } from 'common-services'

const paths = config.paths
const router = Router();

const aiRoutes = () => {
    router.use('/', createProxyMiddleware({
        target: paths.ai_services,
        changeOrigin: true,
        pathRewrite: { '/ai': '/'},
        on: {
            proxyReq: proxy.proxy_request
        }  
    }))
    
    return router
}

export default aiRoutes

  
  