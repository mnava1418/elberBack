const UserForm = require('../models/elber/userForm');
const PasswordForm = require('../models/elber/passwordForm');
const userService = require('../services/userService');
const utilityService = require('../services/utilityService');
const config = require('../config/index');

const register = async (req, res) => {
    const currentUser = new UserForm(req.body)

    if(currentUser.isEmailValid()) {
        let result = await userService.register(currentUser);

        if(result.json.errMessage === undefined) {
            utilityService.sendWelcomeEmail(result.json)
            result.json.actCode = undefined
        }

        res.status(result.status).json(result.json);
    } else {
        const invalidEmailError = config.errorMessages.userService.invalidEmail;
        res.status(invalidEmailError.code).json({errMessage: invalidEmailError.errMessage});
    }
}

const changePassword = async (req, res) => {
    const passwordModel = new PasswordForm(req.body)
    const result = await userService.changePassword(passwordModel)

    res.status(result.status).json(result.json);
}

const recoverPassword = async (req, res) => {
    const email = req.body.email
    const result = await userService.recoverPassword(email)

    res.status(result.status).json(result.json);
}

const login = async (req, res) => {
    const currentUser = new UserForm(req.body);
    const result = await userService.login(currentUser);

    res.status(result.status).json(result.json);
}

const faceBookLogin = async (req, res) => {
    if(req.headers.facebookid && req.headers.facebookid.split(' ')[0] === 'FB' && req.headers.facebookid.split(' ')[1].length > 0){
        const currentUser = new UserForm(req.body);
        const result = await userService.faceBookLogin(currentUser)
        res.status(result.status).json(result.json);
    } else {
        const accessDeniedError = config.errorMessages.userService.accessDenied;
        res.status(accessDeniedError.code).json({errMessage: accessDeniedError.errMessage})
    }
}

module.exports = {
    register,
    login,
    faceBookLogin,
    changePassword,
    recoverPassword
}