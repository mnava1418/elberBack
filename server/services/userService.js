const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const appAuth = require("../config/appAuth")
const userBean = require('../beans/userBean')
const utilityService = require('./utilityService')
var pwdGenerator = require('generate-password');

const activateUser = async (existingUser) => {
    if(!existingUser.isActive){
        existingUser.actCode = '0';
        existingUser.isActive = true;
        existingUser = await userBean.updateUser(existingUser);
    }
}

const faceBookLogin = async (currentUser) => {
    let result = {};
    let isNewUser = false;
    const existingUser = await userBean.getUser(currentUser.getEmail())

    if(existingUser) {
        result.status = 500
        result.json = {errMessage: `El email ${currentUser.getEmail()} ya está registrado`}

    } else {
        let fbUser = await userBean.getFBUser(currentUser.getEmail())

        if(!fbUser){
            fbUser = await userBean.createFBUser(currentUser)
            isNewUser = true
        }
        
        result.status = 200;
        result.json = {isNewUser: isNewUser, user: {email: fbUser.email, name: fbUser.name}, token: jwt.sign({
            email: fbUser.email,
            name: fbUser.name,
            _id: fbUser.id
        }, appAuth.app.jwtPwd)}
    }
    
    return result
}

const recoverPassword = async(email) => {
    let result = {};
    result.status = 200;
    result.json = {message: "Ok"}
    let existingUser = await userBean.getUser(email);

    if(existingUser){
        const newPassword = pwdGenerator.generate({length: 10, numbers: true}) + Math.floor(Math.random() * 10);
        const saltPassword = utilityService.saltPassword(email, newPassword);
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(saltPassword, salt);
        
        existingUser.password = hashPassword
        existingUser = await userBean.updateUser(existingUser)

        if(existingUser.errMessage){
            result.status = 500
            result.json = existingUser
        } else {
            utilityService.sendRecoverPwdEmail(email,newPassword)
        }
    }

    return result
}

const changePassword = async (passwordModel) => {
    let result = {};
    let errorMessages = config.errorMessages.userService;
    let existingUser = await userBean.getUser(passwordModel.getEmail());

    if(existingUser && existingUser.comparePassword(passwordModel.getCurrentPassword(), existingUser.password)) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(passwordModel.getNewPassword(), salt);
        existingUser.password = hashPassword
        existingUser = await userBean.updateUser(existingUser)

        if(existingUser.errMessage){
            result.status = 500
            result.json = existingUser
        } else {
            result.status = 200
            result.json = {message: "Ok"}
        }
    } else {
        result.status = errorMessages.invalidUser.code;
        result.json = {errMessage: errorMessages.invalidUser.errMessage};
    }
    
    return result
}

const login = async (currentUser) => {

    let result = {};
    let errorMessages = config.errorMessages.userService;
    let existingUser = await userBean.getUser(currentUser.getEmail());

    if(existingUser && existingUser.comparePassword(currentUser.getPassword(), existingUser.password)) {
        if(!existingUser.isActive && existingUser.actCode != currentUser.getActCode()){
            result.status = errorMessages.invalidUser.code;
            result.json = {errMessage: errorMessages.invalidUser.errMessage, isActive: false};    
        } else {
            await activateUser(existingUser);

            result.status = 200;
            result.json = {user: {email: existingUser.email, name: existingUser.name}, token: jwt.sign({
                email: existingUser.email,
                name: existingUser.name,
                _id: existingUser.id
            }, appAuth.app.jwtPwd)}
        }
    }else {
        result.status = errorMessages.invalidUser.code;
        result.json = {errMessage: errorMessages.invalidUser.errMessage};
    }

    return result
}

const register = async (currentUser) => {
    let result = {}
    const existingUser = await userBean.getUser(currentUser.getEmail())
    const fbUser = await userBean.getFBUser(currentUser.getEmail())

    if(existingUser || fbUser) {
        result.status = 500
        result.json = {errMessage: `El email ${currentUser.getEmail()} ya está registrado`}

    } else {
        const actCode = utilityService.generateActivationCode();
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(currentUser.getPassword(), salt);
        
        currentUser.setActCode(actCode);
        currentUser.setPassword(hashPassword);
        currentUser.setIsActive(false);

        const newUser = await userBean.createUser(currentUser);
        let status = 200

        if(newUser.errMessage ) {
            status = 500
        } 

        result.status = status
        result.json = newUser
    }

    return result
}

module.exports =  {
    register,
    login, 
    faceBookLogin,
    changePassword,
    recoverPassword
}
