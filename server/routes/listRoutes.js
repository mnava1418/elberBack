const express = require('express')
const listController = require('../controllers/listController')
const utilityController = require('../controllers/utilityController')

const router = express.Router();

module.exports = () => {
    router.post('/createList', utilityController.validateSourceApp, utilityController.validateJWT, listController.createList)
    router.get('/getLists', utilityController.validateSourceApp, utilityController.validateJWT, listController.getLists)
    router.post('/updateItems', utilityController.validateSourceApp, utilityController.validateJWT, listController.updateListItems)

    return router
}