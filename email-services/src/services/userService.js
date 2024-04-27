const emailService = require('./emailService')
const { from } = require('../config').email
const { requestRegistrationCodeMessage } = require('../config/emailMessages')

const requestRegistrationCode = (message) => {
    const messageInfo = JSON.parse(message)
    const emailMessage = requestRegistrationCodeMessage(messageInfo)
    emailService.sendEmail(from, 'NEW - Registration Request', emailMessage)
}

module.exports = {
    requestRegistrationCode
}