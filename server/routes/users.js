const express = require('express');
const userService = require('../services/userService');

const router = express.Router();
const user = userService();

module.exports = () =>{
  router.post('/login', user.login);
  router.post('/register', user.register);

  return router;
}
