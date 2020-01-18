const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/mongoose/User');
const mailService = require('./mailService');
const config = require('../config/index');

const login = async(req, res) => {
    if(req.body.source !== config.app.iosName){
        res.status(500);
        return res.json({errMessage: 'Acceso denegado'});
    }
    const existingUser = await _getUser(req.body.email);

    if(existingUser){
        if(existingUser.comparePassword(req.body.password, existingUser.password)){
            if(!existingUser.isActive && req.body.isNew !== "1"){
                res.status(500);
                return res.json({errMessage: `Registro no completado. Continue en SigUp`});
            } else{
                if(!existingUser.isActive) {
                    existingUser.isActive = true
                    existingUser.save()
                }
                res.status(200)
                return res.json({userName: existingUser.name, token: jwt.sign({
                    email: existingUser.email,
                    name: existingUser.name,
                    _id: existingUser.id
                }, config.app.jwtPwd)})
            }
        } else{
            res.status(500);
            return res.json({errMessage: `Email/Password incorrecto`});
        } 
    } else {
        res.status(500);
        return res.json({errMessage: 'Email/Password incorrecto'})
    }
}

const _getUser = async (email) => {
    const user = await UserModel.findOne({ email: email});
    return user
}

const _generateCode = () => {
    let actCode = crypto.randomBytes(6).toString('hex')

    if(actCode.length > 8){
        actCode = actCode.substr(0,8)
    }

    return actCode
}

const _sendWelcomeEmail = (user) => {
    const mail = mailService()
                       
    let message = config.mail.messages.welcome.saludo + user.name
    message += config.mail.messages.welcome.mensaje + user.actCode
    message += config.mail.messages.welcome.footer
    
    mail.sendMail(user.email, 'Bienvenido a Elber!', message)
}

const register = async(req, res) => {
    if(req.body.source !== config.app.iosName){
        res.status(500);
        return res.json({errMessage: 'Acceso denegado'});
    }

    const existingUser = await _getUser(req.body.email);

    if(existingUser) {
        if(!existingUser.isActive){
            if(existingUser.comparePassword(req.body.password, existingUser.password)){
                existingUser.actCode = _generateCode()
            
                existingUser.save((err, user) => {
                    if(err){
                        res.status(500);
                        return res.json({errMessage: err.message});
                    } else {
                        user.password = undefined;
                        _sendWelcomeEmail(user)
                        res.status(200)
                        return res.json(user);
                    }
                })
            }else{
                res.status(500);
                return res.json({errMessage: `Email/Password incorrecto`});
            } 
        } else{
            res.status(500);
            return res.json({errMessage: `El email ${req.body.email} ya está registrado`});
        }
    }else{
        const newUser = new UserModel(req.body) 
        newUser.isActive = false
        
        if(!validator.isEmail(newUser.email)) {
            res.status(500);
            return res.json({errMessage: 'El email no es válido'});
        }

        newUser.actCode = _generateCode()

        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        newUser.password = hashPassword;
        
        newUser.save((err, user) => {
            if(err){
                res.status(500);
                return res.json({errMessage: err.message});
            } else {
                user.password = undefined;
                _sendWelcomeEmail(user)
                res.status(200)
                return res.json(user);
            }
        })
    }
}

module.exports = () => {
    return {
        login,
        register
    }
}
