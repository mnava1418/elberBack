const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

module.exports = () => {
    router.post('/requestCode', userController.requestRegistrationCode)
    return router
}