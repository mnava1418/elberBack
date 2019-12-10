const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const UserModel = require('../models/mongoose/User')

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

    if(!validator.isEmail(newUser.email)) {
        res.status(500);
        return res.json({errMessage: 'Email inválido!'});
    }

    if(!validator.equals(newUser.gender, 'Male') && !validator.equals(newUser.gender, 'Female')) {
        res.status(500);
        return res.json({errMessage: 'Genero inválido!'});
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.password = hashPassword;
    
    newUser.save((err, user) => {
        if(err){
            res.status(500);
            return res.json({errMessage: err.message});
        } else {
            user.password = undefined;
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
