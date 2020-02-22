const UserForm = require('../models/elber/userForm');
const userService = require('../services/userService');
const utilityService = require('../services/utilityService');
const config = require('../config/index');

const register = async (req, res) => {
    const currentUser = new UserForm(req.body)

    if(currentUser.isEmailValid()) {
        let result = await userService.register(currentUser);

        if(result.json.errMessage === undefined) {
            utilityService.sendWelcomeEmail(result.json)
        }

        res.status(result.status).json(result.json);
    } else {
        const invalidEmailError = config.errorMessages.userService.invalidEmail;
        res.status(invalidEmailError.code).json({errMessage: invalidEmailError.errMessage});
    }
}

module.exports = {
    register
}