import {NextFunction, Response} from 'express'
import admin from 'firebase-admin'
import { AuthenticationRequest } from '../interfaces/dialogFlowInterface'


const validateToken = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization

        if(!authorizationHeader) {
            return res.status(401).json({error: 'Unauthorized user.'})
        }

        const token = authorizationHeader!.split(' ')[1]
        const user = await admin.auth().verifyIdToken(token as string)
        
        req.user = user

        next()
    } catch (error) {
        res.status(401).json({error: 'Unauthorized user.'})
    }
}

const authController = {
    validateToken
}

export default authController