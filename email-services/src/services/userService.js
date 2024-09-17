const emailService = require('./emailService')
const { from } = require('../config').email
const { 
    requestRegistrationCodeMessage, 
    acceptRegistrationCodeMessage, 
    rejectRegistrationCodeMessage,
    verifyAccountMessage
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

    emailService.sendEmail(sender, 'Elber - Registration Request', emailMessage)
}

const verifyAccount = (message) => {
    const messageInfo = JSON.parse(message)
    const {email, verificationLink} = messageInfo
    const emailMessage = verifyAccountMessage(email, verificationLink)
    emailService.sendEmail(email, 'Elber - Verify your Account', emailMessage)
}

module.exports = {
    requestRegistrationCode,
    responseRegistrationCode,
    verifyAccount
}