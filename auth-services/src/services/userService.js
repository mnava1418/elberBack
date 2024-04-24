const tokenService = require('./tokenService')
const {sendMessage, topics} = require('kafka-services')

const REQUEST_ACCEPT_ACTION = 'accept'
const REQUEST_REJECT_ACTION = 'reject'

const requestRegistrationCode = async(email) => {
    const payload = {sender: email}
    const acceptToken = tokenService.getAdminToken({...payload, action: REQUEST_ACCEPT_ACTION})
    const rejectToken = tokenService.getAdminToken({...payload, action: REQUEST_REJECT_ACTION})
    const encodedAcceptToken = encodeURIComponent(acceptToken)
    const encodedRejectToken = encodeURIComponent(rejectToken)

    await sendMessage(topics.email, 'request_access', JSON.stringify({sender: email, acceptToken: encodedAcceptToken, rejectToken: encodedRejectToken}))
    .catch(error => {
        console.error(error)
        throw new Error(error.message)
    })
}

module.exports = {
    requestRegistrationCode
}
