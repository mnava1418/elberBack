const tokenService = require('../services/tokenService')

const validateTokenQuery = (req, res, next) => {
    let token = req.query.token

    if(!token) {
        res.status(401).json({error: 'Unauthorized user.'})
    } else {
        token = decodeURIComponent(token)
        const tokenPayload = tokenService.validateToken(token)

        if(tokenPayload) {
            req.tokenPayload = tokenPayload
            next()
        } else {
            res.status(401).json({error: 'Unauthorized user.'})
        }
    }
}

const isAdminToken = (req, res, next) => {
    const tokenPayload = req.tokenPayload

    if(tokenPayload && tokenService.isAdminToken(tokenPayload)) {
        next()
    } else {
        res.status(403).json({error: 'Unauthorized user.'})
    }
}

module.exports = {
    validateTokenQuery,
    isAdminToken
}