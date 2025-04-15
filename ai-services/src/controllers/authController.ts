import {NextFunction, Response, Request} from 'express'
import { CustomHttpHeaders } from '../interfaces/httpInterface'
import { gateway } from '../config/auth'

const validateGateway = (req: Request, res: Response, next: NextFunction) => {
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

const authController = {
    validateGateway
}

export default authController