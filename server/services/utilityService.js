const crypto = require('crypto');
const appAuth = require('../config/appAuth');
const config = require('../config/index');
const mailService = require('./mailService');

const validateSourceApp = (source) => {
    if( source === appAuth.app.iosName) {
        return true
    }
        
    return false
}

const sendWelcomeEmail = (user) => {
    const welcomeMessage = config.mail.messages.welcome;
                       
    let message = welcomeMessage.saludo + user.name;
    message += welcomeMessage.mensaje + user.actCode;
    message += welcomeMessage.footer;
    
    mailService.sendMail(user.email, welcomeMessage.subject, message);
}

const generateActivationCode = () => {
    let actCode = crypto.randomBytes(6).toString('hex')

    if(actCode.length > 8) {
        actCode = actCode.substr(0,8)
    }

    return actCode
}

module.exports = {
    validateSourceApp,
    generateActivationCode,
    sendWelcomeEmail
}