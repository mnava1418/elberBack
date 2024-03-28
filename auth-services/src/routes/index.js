var express = require('express');
var router = express.Router();

module.exports = () => {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'DOT Aut Services' });
  });

  return router
};
