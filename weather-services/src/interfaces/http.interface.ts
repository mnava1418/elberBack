import { IncomingHttpHeaders } from 'http'

export interface CustomHttpHeaders extends IncomingHttpHeaders {
    'x-api-gateway-secret'?: string,
    'x-user-uid'?: string,
}
