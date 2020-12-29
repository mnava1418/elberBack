const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const indexRouter = require('./routes');
const bodyParser = require('body-parser')
const app = express();

const setMiddlewares = () => {
  //DOS Attacks parameters
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

  //app middlewares
  app.use(limiter);
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser());
  app.use(express.static('public'));
}

const setRoutes = () => {
  //app routes
  app.use('/', indexRouter());

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.send(err);
  });
}

setMiddlewares();
setRoutes();
module.exports = app;