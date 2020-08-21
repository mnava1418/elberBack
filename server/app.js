const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const indexRouter = require('./routes');
const app = express();

const setMiddlewares = () => {
  //DOS Attacks parameters
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

  //app middlewares
  app.use(limiter);
  app.use(helmet());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static('public'));
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next()
  })
}

const setViews = () => {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
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
    if(err.status == 404 )
      res.locals.message = 'Oops! Esta página no existe'
    else
      res.locals.message = 'Mi papá ya la cagó pero está trabajando en ello';
    
    res.locals.error = err;

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}

app.locals.title = 'Elber';
setViews();
setMiddlewares();
setRoutes();
module.exports = app;