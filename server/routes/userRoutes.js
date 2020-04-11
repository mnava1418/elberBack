const express = require('express');
const userController = require('../controllers/userController')
const utilityController = require('../controllers/utilityController')

const router = express.Router();

module.exports = () =>{
  router.post('/register', utilityController.validateSourceApp, userController.register);
  router.post('/login', utilityController.validateSourceApp, userController.login);
  router.post('/faceBookLogin', utilityController.validateSourceApp, userController.faceBookLogin)
  router.post('/changePassword', utilityController.validateSourceApp, userController.changePassword)
  router.post('/recoverPassword', utilityController.validateSourceApp, userController.recoverPassword)

  return router;
}
