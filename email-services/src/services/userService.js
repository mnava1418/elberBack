const emailService = require('./emailService')
const { from } = require('../config').email

const requestRegistrationCode = (message) => {
    emailService.sendEmail(from, 'NEW - Registration Request', message)
}

module.exports = {
    requestRegistrationCode
}