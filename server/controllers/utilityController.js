const utilityService = require('../services/utilityService');
const config = require('../config/index')

const validateSourceApp = (req,res,next) => {
    const source = req.get('source')
    if(utilityService.validateSourceApp(source)) {
        next();
    } else {
        const accessDeniedError = config.errorMessages.userService.accessDenied;
        res.status(accessDeniedError.code).json({errMessage: accessDeniedError.errMessage})
    }
}

const validateJWT = (req, res, next) => {
    let user = undefined
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        user = utilityService.validateJWT(req.headers.authorization && req.headers.authorization.split(' ')[1])
    } 

    if(user != undefined){
        req.user = user
        next()
    } else {
        const accessDeniedError = config.errorMessages.userService.accessDenied;
        res.status(accessDeniedError.code).json({errMessage: accessDeniedError.errMessage})
    }
}

module.exports = {
    validateSourceApp,
    validateJWT
}
