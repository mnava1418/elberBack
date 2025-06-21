import * as proxyControllers from './controllers/proxy.controller'
import * as authControllers from './controllers/auth.controller'
import * as authConfig from './config/auth'

export const proxy = proxyControllers
export const auth = authControllers
export const gateway = authConfig.gateway
