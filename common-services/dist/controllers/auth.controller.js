"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGateway = void 0;
const auth_1 = require("../config/auth");
const validateGateway = (req, res, next) => {
    try {
        const headers = req.headers;
        if (headers['x-api-gateway-secret'] === auth_1.gateway.secret) {
            next();
        }
        else {
            res.status(403).json({ error: 'Invalid Call.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Error Server.' });
    }
};
exports.validateGateway = validateGateway;
