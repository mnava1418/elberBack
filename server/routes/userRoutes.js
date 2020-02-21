const express = require('express');
const userController = require('../controllers/userController')
const utilityController = require('../controllers/utilityController')

const router = express.Router();

module.exports = () =>{
  router.post('/register', utilityController.validateSourceApp, userController.register);

  return router;
}
