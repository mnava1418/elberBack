import { ClientRequest } from "http"
import { AuthenticationRequest } from "../interfaces"
import { Response } from "express"
import config from "../config"

export const proxy_request = (proxyReq: ClientRequest, req: AuthenticationRequest, res: Response) => {
    const user = req.user

    if(user) {
        proxyReq.setHeader('x-user-uid', user.uid)
    }
    
    if(config.auth.gateway.secret) {
        proxyReq.setHeader('x-api-gateway-secret', config.auth.gateway.secret)
    }
}