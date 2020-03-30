const utilityService = require('../services/utilityService');
const config = require('../config/index')

const validateSourceApp = (req,res,next) => {
    if(utilityService.validateSourceApp(req.headers.source)) {
        next();
    } else {
        const accessDeniedError = config.errorMessages.userService.accessDenied;
        res.status(accessDeniedError.code).json({errMessage: accessDeniedError.errMessage})
    }
}

module.exports = {
    validateSourceApp
}
