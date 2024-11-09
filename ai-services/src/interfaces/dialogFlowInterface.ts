import {Request} from 'express'
import admin from 'firebase-admin'

export interface DialogFlowResponse {
    responseText: string,
    intentName: string
}

export interface AuthenticationRequest extends Request {
    user?: admin.auth.DecodedIdToken
}

export interface ChatResponse {
    messages: {},
    lastKey: string | null
}