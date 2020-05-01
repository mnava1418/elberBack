const express = require('express')
const listController = require('../controllers/listController')
const utilityController = require('../controllers/utilityController')

const router = express.Router();

module.exports = () => {
    router.post('/createList', utilityController.validateSourceApp, utilityController.validateJWT, listController.createList)

    return router
}