import {Request} from 'express'
import admin from 'firebase-admin'
import { IntentName } from './nlpInterface'

export interface DialogFlowResponse {
    responseText: string,
    intentName: IntentName,
}

export interface AuthenticationRequest extends Request {
    user?: admin.auth.DecodedIdToken
}
