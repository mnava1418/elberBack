import {Request} from 'express'
import admin from 'firebase-admin'

export interface AuthenticationRequest extends Request {
    user?: admin.auth.DecodedIdToken
}
