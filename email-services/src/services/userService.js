const emailService = require('./emailService')
const { from } = require('../config').email

const requestRegistrationCode = (message) => {
    emailService.sendEmail(from, 'NEW - Registration Request', message)
    console.log('se mando')
}

module.exports = {
    requestRegistrationCode
}