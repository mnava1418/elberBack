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
    const message = `
    <div style="background-color: #f9f9ff; width: 100%; margin: 0 auto;">
        <br><br><br>
        <img src="https://elberdrops.com/images/logo.png" alt="Elber Drops" style="display: block; margin-left: auto; margin-right: auto; width: 100px">
        <br>
        <p style="text-align: center; font-family: Arial, Helvetica, sans-serif; color: #000000; font-size: 1em;">Atención!
            <br><br>
            Tu password ha sido restablecido. Si tu no lo solicitaste, cámbialo inmediatamente desde tu celular que ya te chingaron.<br><br>Tu nuevo password es: ${pwd}
            <br><br>Para mayor seguridad, cambia tu password en cuanto inicies sesión.
            <br><br>
            <a href="https://elberdrops.com/" target="_blank" style="color: #000000;">Atte. Elber Drops</a>
        </p>
        <br><br>
    </div>`

    mailService.sendMail(email, 'Restablecer Password!', message);
}

const sendWelcomeEmail = (user) => {
    const message = `
    <div style="background-color: #f9f9ff; width: 100%; margin: 0 auto;">
        <br><br><br>
        <img src="https://elberdrops.com/images/logo.png" alt="Elber Drops" style="display: block; margin-left: auto; margin-right: auto; width: 100px">
        <br>
        <p style="text-align: center; font-family: Arial, Helvetica, sans-serif; color: #000000; font-size: 1em;">Hola ${user.name}!
            <br><br>
            Gracias por registrarte. Estoy seguro que seremos grandes amigos :) <br><br> Tu código de activación es: ${user.actCode}
            <br><br>
            <a href="https://elberdrops.com/" target="_blank" style="color: #000000;">Atte. Elber Drops</a>
        </p>
        <br><br>
    </div>`
        
    mailService.sendMail(user.email, 'Bienvenido a Elber!', message);
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