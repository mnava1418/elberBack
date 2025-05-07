import { Request } from 'express';
import admin from 'firebase-admin';
import { IncomingHttpHeaders } from 'http';
export interface AuthenticationRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}
export interface CustomHttpHeaders extends IncomingHttpHeaders {
    'x-api-gateway-secret'?: string;
    'x-user-uid'?: string;
}
