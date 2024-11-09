import {NextFunction, Request, Response} from 'express'
import admin from 'firebase-admin'

export interface AuthenticationRequest extends Request {
    user?: admin.auth.DecodedIdToken
}

const validateToken = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization

        if(!authorizationHeader) {
            res.status(401).json({error: 'Unauthorized user.'})
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