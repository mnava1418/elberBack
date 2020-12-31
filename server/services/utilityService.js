const {Translate} = require('@google-cloud/translate').v2;
const jwt = require('jsonwebtoken')
const appAuth = require('../config/appAuth');

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

const translateText = async (text, from, to) => {
    let [translations] = await translate.translate(text, to);
    translations = Array.isArray(translations) ? translations : [translations];
    
    let finalTranslation = ""

    for(translation of translations) {
        finalTranslation = `${finalTranslation} ${translation}`
    }

    if(finalTranslation.trim().length > 2 || finalTranslation.trim() == '') {
        return [finalTranslation.trim()]
    }
    
    translations = translations.filter( element => element != finalTranslation.trim())
    
    let result = await translateText(text.split(" "), from, to)
    translations = translations.concat(result)
    return translations
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
    translateText,
    toCamelCase,
    validateJWT
}