const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router()

module.exports = () => {
    router.post('/requestCode', userController.requestRegistrationCode)
    router.get('/responseCode', authController.validateTokenQuery, authController.isAdminToken, userController.responseRegistrationCode)
    return router
}
