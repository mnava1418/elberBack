var express = require('express');
const userRoutes = require('./userRoutes')

var router = express.Router();

module.exports = () => {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Elber Auth Services' });
  });

  router.use('/users', userRoutes())

  return router
};
