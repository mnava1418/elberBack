const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const appAuth = require("../config/appAuth")
const userBean = require('../beans/userBean')
const utilityService = require('./utilityService')

const activateUser = async (existingUser) => {
    if(!existingUser.isActive){
        existingUser.actCode = '0';
        existingUser.isActive = true;
        existingUser = await userBean.updateUser(existingUser);
    }
}

const login = async (currentUser) => {

    let result = {};
    let errorMessages = config.errorMessages.userService;
    let existingUser = await userBean.getUser(currentUser.getEmail());

    if(existingUser && existingUser.comparePassword(currentUser.getPassword(), existingUser.password)) {
        if(!existingUser.isActive && existingUser.actCode != currentUser.getActCode()){
            result.status = errorMessages.invalidUser.code;
            result.json = {errMessage: errorMessages.invalidUser.errMessage};    
        } else {
            await activateUser(existingUser);

            result.status = 200;
            result.json = {userName: existingUser.name, token: jwt.sign({
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

    if(existingUser) {
        result.status = 500
        result.json = {errMessage: `El email ${currentUser.getEmail()} ya está registrado`}

    } else {
        const actCode = utilityService.generateActivationCode();
        const hashPassword = bcrypt.hashSync(currentUser.getPassword(), 10);

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
    login
}
