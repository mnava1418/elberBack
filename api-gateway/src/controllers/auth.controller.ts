import { NextFunction, Response } from 'express'
import admin from 'firebase-admin'
import { AuthenticationRequest } from 'common-services/src/interfaces/http.interface'

const validateToken = (req: AuthenticationRequest, res: Response, next: NextFunction): void => {
    try {
        const authorizationHeader = req.headers.authorization

        if(!authorizationHeader) {
            res.status(401).json({error: 'Unauthorized user.'})
            return
        }

        const token = authorizationHeader!.split(' ')[1]
        admin.auth().verifyIdToken(token as string)
        .then(user => {
            req.user = user
            next()
        })
        .catch(() => {
            res.status(401).json({error: 'Unauthorized user.'})
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Error Server.'})
    }
}

const authController = {
    validateToken
}

export default authController