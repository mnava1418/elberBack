const crypto = require('crypto');
const {Translate} = require('@google-cloud/translate').v2;
const jwt = require('jsonwebtoken')
const appAuth = require('../config/appAuth');
const config = require('../config/index');
const mailService = require('./mailService');

// Creates a client for Google Translate
const translate = new Translate();

const validateSourceApp = (source) => {
    if( source === appAuth.app.iosName) {
        return true
    }
        
    return false
}

const validateJWT = (currentJWT) => {
    let user = undefined
    jwt.verify(currentJWT, appAuth.app.jwtPwd, (err, decode) => {
        if(err) {
            user = undefined
        } else {
            user = decode
        }
    })

    return user
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
    let translations = await translate.translate(text, to);
    translations = Array.isArray(translations) ? translations : [translations];
    return translations[0];
}

const toCamelCase = (text) => {
    let finalText = ''
    let arr = text.split(" ")

    for(let i = 0; i < arr.length; i++){
        let word = arr[i]
        finalText = `${finalText}${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()} `
    }

    return finalText.trim()
}

module.exports = {
    validateSourceApp,
    generateActivationCode,
    sendWelcomeEmail,
    saltPassword,
    sendRecoverPwdEmail,
    translateText,
    toCamelCase,
    validateJWT
}