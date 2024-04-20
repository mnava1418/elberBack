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

module.exports = {
    generateToken,
    getAdminToken
}
