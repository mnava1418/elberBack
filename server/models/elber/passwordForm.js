//let parameters = ["email": email, "currentPassword": passwordModel.getCurrentPassword(), "newPassword":

let _email = undefined
let _currentPassword = undefined
let _newPassword = undefined

class PasswordForm {
    constructor(reqPasswordBody) {
        _email = reqPasswordBody.email,
        _currentPassword = reqPasswordBody.currentPassword,
        _newPassword = reqPasswordBody.newPassword
    }

    //Getters

    getEmail() {
        return _email
    }

    getCurrentPassword() {
        return _currentPassword
    }

    getNewPassword() {
        return _newPassword
    }
}

module.exports = PasswordForm