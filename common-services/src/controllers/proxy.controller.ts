import { ClientRequest } from "http"
import { AuthenticationRequest } from "../interfaces/http.interface"
import { Response } from "express"
import { gateway } from "../config/auth"

export const proxy_request = (proxyReq: ClientRequest, req: AuthenticationRequest, res: Response) => {
    const user = req.user

    if(user) {
        proxyReq.setHeader('x-user-uid', user.uid)
    }
    
    if(gateway.secret) {
        proxyReq.setHeader('x-api-gateway-secret', gateway.secret)
    }
}