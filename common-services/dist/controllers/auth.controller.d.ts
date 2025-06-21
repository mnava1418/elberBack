import express from 'express';
import { CustomHttpHeaders } from '../interfaces/http.interface';
export declare const validateGateway: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export declare const validateGatewaySync: (headers: CustomHttpHeaders) => boolean;
