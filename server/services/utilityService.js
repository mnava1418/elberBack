const appAuth = require("../config/appAuth")

const validateSourceApp = (source) => {
    if( source === appAuth.app.iosName) {
        return true
    }
        
    return false
}

module.exports = {
    validateSourceApp
}