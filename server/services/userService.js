const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const UserModel = require('../models/mongoose/User')
const mailService = require('./mailService')
const config = require('../config/index')
const crypto = require('crypto')

const login = (req, res) => {
    res.send('Login Service');
}

const logout = (req, res) => {
    res.send('Logout Service');
}

const _getUser = async (email) => {
    const user = await UserModel.findOne({ email: email});
    return user
}

const register = async(req, res) => {
    const existingUser = await _getUser(req.body.email);

    if(existingUser) {
        res.status(500);
        return res.json({errMessage: `El email ${req.body.email} ya está registrado`});
    }

    const newUser = new UserModel(req.body) 
    newUser.isActive = false
    
    if(!validator.isEmail(newUser.email)) {
        res.status(500);
        return res.json({errMessage: 'El email no es válido'});
    }

    let actCode = crypto.randomBytes(6).toString('hex')

    if(actCode.length > 8){
        actCode = actCode.substr(0,8)
    }

    newUser.actCode = actCode

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.password = hashPassword;
    
    newUser.save((err, user) => {
        if(err){
            res.status(500);
            return res.json({errMessage: err.message});
        } else {
            user.password = undefined;
            const mail = mailService()
           
            let message = config.mail.messages.welcome.saludo + user.name
            message += config.mail.messages.welcome.mensaje + user.actCode
            message += config.mail.messages.welcome.footer
            
            mail.sendMail(user.email, 'Bienvenido a Elber!', message)
            return res.json(user);
        }
    })
}

module.exports = () => {
    return {
        login,
        logout,
        register
    }
}
