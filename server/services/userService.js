const jwt = require('jsonwebtoken');
const appAuth = require("../config/appAuth")

const getToken = () => {
    const result = {
        status : 200,
        json: {
            token: jwt.sign({}, appAuth.app.jwtPwd)
        }
    }

    return result
}

module.exports =  {
    getToken, 
}
