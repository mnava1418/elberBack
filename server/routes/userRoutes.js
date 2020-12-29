const express = require('express');
const userController = require('../controllers/userController')
const utilityController = require('../controllers/utilityController')

const router = express.Router();

module.exports = () =>{
  router.get('/token', [utilityController.validateSourceApp], userController.getToken)
  return router;
}
