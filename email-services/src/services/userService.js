const emailService = require('./emailService')
const { from } = require('../config').email
const { 
    requestRegistrationCodeMessage, 
    acceptRegistrationCodeMessage, 
    rejectRegistrationCodeMessage 
} = require('../config/emailMessages')

const requestRegistrationCode = (message) => {
    const messageInfo = JSON.parse(message)
    const emailMessage = requestRegistrationCodeMessage(messageInfo)
    emailService.sendEmail(from, 'NEW - Registration Request', emailMessage)
}

const responseRegistrationCode = (message) => {
    const messageInfo = JSON.parse(message)
    const {sender, action, token} = messageInfo
    let emailMessage

    if(action === 'accept' && token) {
        emailMessage = acceptRegistrationCodeMessage(token, sender)
    } else {
        emailMessage = rejectRegistrationCodeMessage(sender)
    }

    emailService.sendEmail(sender, 'DOT - Registration Request', emailMessage)
}

module.exports = {
    requestRegistrationCode,
    responseRegistrationCode
}