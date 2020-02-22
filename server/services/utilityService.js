const appAuth = require("../config/appAuth")
const crypto = require('crypto');

const validateSourceApp = (source) => {
    if( source === appAuth.app.iosName) {
        return true
    }
        
    return false
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
    generateActivationCode
}