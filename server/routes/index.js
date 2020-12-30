const express = require('express');
const userRouter = require('./userRoutes');
const skillsRouter = require('./skillsRoutes')
const listRouter = require('./listRoutes')
const router = express.Router();


module.exports = () =>{
  router.get('/', (req, res, next) => {
    res.status(200).send('Elber is ready!')
  });  

  router.use('/user', userRouter())
  
  return router;
}
