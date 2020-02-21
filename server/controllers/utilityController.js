const utilityService = require('../services/utilityService');
const config = require('../config/index')

const resErrorMessage = (res, errCode, errMessage ) => {
    res.status(errCode).json({errMessage: errMessage})
}

const validateSourceApp = (req,res,next) => {
    if(utilityService.validateSourceApp(req.body.source)) {
        next();
    } else {
        const accessDeniedError = config.errorMessages.userService.accessDenied;
        resErrorMessage(res, accessDeniedError.code, accessDeniedError.errMessage )
    }
}

module.exports = {
    validateSourceApp,
    resErrorMessage
}
