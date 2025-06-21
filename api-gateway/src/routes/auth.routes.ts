import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config';
import { proxy } from 'common-services'

const paths = config.paths
const router = Router();

const authRoutes = () => {
    router.use('/', createProxyMiddleware({
        target: paths.auth_services,
        changeOrigin: true,
        pathRewrite: { '/auth':'/' },
        on: {
            proxyReq: proxy.proxy_request
        }
    }))

    return router
}

export default authRoutes