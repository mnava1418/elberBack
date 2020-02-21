const express = require('express');
const userService = require('../services/userService');
const utilityController = require('../controllers/utilityController')

const router = express.Router();
const user = userService();

module.exports = () =>{
  router.post('/register', utilityController.validateSourceApp, user.register);

  return router;
}
