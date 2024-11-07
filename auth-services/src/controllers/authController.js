const tokenService = require('../services/tokenService')

const validateTokenQuery = (req, res, next) => {
    let token = req.query.token
    validateToken(req, res, next, token)
}

const validateTokenHeader = (req, res, next) => {
    let token = req.headers.authorization

    if(token) {
        token = token.split(' ')[1]
    }

    validateToken(req, res, next, token)
}

const validateToken = (req, res, next, token) => {
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
    validateTokenHeader,
    isAdminToken
}