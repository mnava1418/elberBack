const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const appAuth = require("../config/appAuth")
const userBean = require('../beans/userBean')
const utilityService = require('./utilityService')
var pwdGenerator = require('generate-password');

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
