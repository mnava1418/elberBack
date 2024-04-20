const tokenService = require('./tokenService')
const {sendMessage, topics} = require('kafka-services')

const requestRegistrationCode = async(email) => {
    const payload = {sender: email}
    const token = tokenService.getAdminToken(payload)
    const encodedToken = encodeURIComponent(token)

    await sendMessage(topics.email, 'request_access', JSON.stringify({sender: email, token: encodedToken}))
    .catch(error => {
        console.error(error)
        throw new Error(error.message)
    })
}

module.exports = {
    requestRegistrationCode
}
