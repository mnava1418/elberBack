import express from 'express'
import { CustomHttpHeaders } from '../interfaces/http.interface'
import { gateway } from '../config/auth'
 
 export const validateGateway = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const headers = req.headers as CustomHttpHeaders

        if(headers['x-api-gateway-secret'] === gateway.secret) {
            next()
        } else {
            res.status(403).json({error: 'Invalid Call.'})
        }        
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Error Server.'})
    }
}

export const validateGatewaySync = (headers: CustomHttpHeaders) => {
    try {
        if(headers['x-api-gateway-secret'] === gateway.secret) {
            return true
        } else {
            return false
        }     
    } catch (error) {
        console.error(error)
        return false
    }
}