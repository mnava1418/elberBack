import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config';
import { gateway } from 'common-services'

const paths = config.paths
const router = Router();

const socketRoutes = () => {
    router.use('/', createProxyMiddleware({
        target: paths.ai_services,
        changeOrigin: true,
        ws: true,
        headers: {
            'x-api-gateway-secret': gateway.secret || ''
        }
    }))
    
    return router
}

export default socketRoutes

  
  