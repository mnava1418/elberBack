"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxy_request = void 0;
const auth_1 = require("../config/auth");
const proxy_request = (proxyReq, req, res) => {
    const user = req.user;
    if (user) {
        proxyReq.setHeader('x-user-uid', user.uid);
    }
    if (auth_1.gateway.secret) {
        proxyReq.setHeader('x-api-gateway-secret', auth_1.gateway.secret);
    }
};
exports.proxy_request = proxy_request;
