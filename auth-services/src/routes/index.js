var express = require('express');
var router = express.Router();

module.exports = () => {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'DOT Auth Services' });
  });

  return router
};
