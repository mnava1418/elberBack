const express = require('express')
const skillsController = require('../controllers/skillsController')
const utilityController = require('../controllers/utilityController')

const router = express.Router();

module.exports = () => {
    router.get('/getSkills', utilityController.validateSourceApp, utilityController.validateJWT, skillsController.getSkills)

    return router
}