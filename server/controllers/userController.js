const userService = require('../services/userService');

const getToken = (req, res) => {
    const result = userService.getToken()
    res.status(result.status).json(result.json)
}

module.exports = {
    getToken
}