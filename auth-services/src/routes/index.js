var express = require('express');
const userRoutes = require('./userRoutes')

var router = express.Router();

module.exports = () => {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'DOT Auth Services' });
  });

  router.use('/auth/users', userRoutes())

  return router
};
