const crypto = require('crypto');
const appAuth = require('../config/appAuth');
const config = require('../config/index');
const mailService = require('./mailService');
const translate = require('translate')

const validateSourceApp = (source) => {
    if( source === appAuth.app.iosName) {
        return true
    }
        
    return false
}

const sendRecoverPwdEmail = (email, pwd) => {
    const recoverPwdMessage = config.mail.messages.recoverPwd;
    let message = recoverPwdMessage.saludo + recoverPwdMessage.mensaje + pwd + recoverPwdMessage.footer;
    mailService.sendMail(email, recoverPwdMessage.subject, message);
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

const saltPassword = (email, currentPassword) => {
    const emailArr = email.split("@")
    const startSalt = emailArr[0].replace(/ /g, "")
    const endSalt = startSalt.length
    let newPwd = startSalt + currentPassword + endSalt
    return newPwd
}

const translateText = async (text, from, to) => {
    translate.engine = 'yandex'
    translate.key = appAuth.app.yandexKey

    const result = await translate(text, {from: from, to: to})
    return result
}

module.exports = {
    validateSourceApp,
    generateActivationCode,
    sendWelcomeEmail,
    saltPassword,
    sendRecoverPwdEmail,
    translateText
}