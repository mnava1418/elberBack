import express from 'express'
import path from 'path'
import logger from 'morgan'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index'

const app = express()

const setMiddlewares = () => {
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'jade')
    
    //DOS Attacks parameters
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000 // limit each IP to 1000 requests per windowMs
    })

    app.use(limiter)
    app.use(logger('dev'))
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
}

const setRoutes = () => {
    app.use('/', indexRouter)
}

setMiddlewares()
setRoutes()

export default app
