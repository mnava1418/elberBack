const validator = require('validator');

let _email = undefined
let _name = undefined
let _password = undefined
let _img = undefined
let _actCode = undefined
let _isActive = undefined

class UserForm {
    constructor(reqUserBody) {
        _email = reqUserBody.email,
        _name = reqUserBody.name,
        _password = reqUserBody.password,
        _img = reqUserBody.img,
        _actCode = reqUserBody.actCode,
        _isActive = reqUserBody.isActive
    }

    getUserAsObject() {
        const userAsObject = {
            email: _email,
            name: _name,
            password: _password,
            img: _img,
            actCode: _actCode,
            isActive: _isActive
        }

        return userAsObject
    }

    getEmail() {
        return _email
    }

    getPassword() {
        return _password
    }

    getActCode() {
        return _actCode
    }

    setActCode(actCode) {
        _actCode = actCode
    }

    setPassword(password) {
        _password = password
    }

    setIsActive(isActive) {
        _isActive = isActive
    }

    isEmailValid()
    {
        return(validator.isEmail(_email))
    } 
}

module.exports = UserForm