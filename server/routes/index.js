const express = require('express');
const userRouter = require('./userRoutes');
const skillsRouter = require('./skillsRoutes')
const listRouter = require('./listRoutes')
const router = express.Router();


module.exports = () =>{
  router.get('/', function(req, res, next) {
    res.render('index');
  });  

  router.use('/user', userRouter())
  router.use('/skills', skillsRouter())
  router.use('/list', listRouter())
  
  return router;
}
