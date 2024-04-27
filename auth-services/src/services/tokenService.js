const jwt = require('jsonwebtoken')
const auth = require('../config/auth').jwt


const generateToken = (payload, options) => {
    const token = jwt.sign(payload, auth.secret, options)
    return token
}

const getAdminToken = (payload) => {
    payload = {...payload, isAdmin: true}
    const token = generateToken(payload, {expiresIn: '24h'})
    return token
}

const validateToken = (token) => {
    try {
        const payload = jwt.verify(token, auth.secret)
        return payload
    } catch (error) {
        console.error(error)
        return undefined
    }
}

const isAdminToken = (tokenPayload) => {
    if(tokenPayload.isAdmin) {
        return true
    } else {
        return false
    }
}

module.exports = {
    generateToken,
    getAdminToken,
    validateToken,
    isAdminToken
}
