import { ClientRequest } from "http";
import { AuthenticationRequest } from "../interfaces/http.interface";
import { Response } from "express";
export declare const proxy_request: (proxyReq: ClientRequest, req: AuthenticationRequest, res: Response) => void;
