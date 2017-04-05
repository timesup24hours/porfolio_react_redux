import bodyParser from 'body-parser'
import passport from 'passport'
import { auth as authConfig } from '../../config'
import session from 'express-session'
import morgan from 'morgan'
import cors from 'cors'
import { logger } from '../util'
import passportInit from '../auth/passport'
import path from 'path'
import express from 'express'
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';

/* SETUP MIDDLEWARE */
export default (app) => {

  // static files
  if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../../frontend/build')))
    console.log(path.join(__dirname, '../../../frontend/build'));
  } else {
    app.use(express.static(path.join(__dirname, '../../../frontend/public')))
    console.log(path.join(__dirname, '../../../frontend/public'));
  }

  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'ejs');
  // app.engine('html', require('ejs').renderFile);

  // setup logging
  if(process.env.NODE_ENV !== 'test')
    app.use(morgan('combined', { stream: logger.stream }))
  // setup CORS
  app.use(cors())
  // add body parsing
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

   // setup session
  const MongoStore = connectMongo(session);
  app.use(session({
      secret: authConfig.sessionSecret,
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000
      },
      store: new MongoStore({
          mongooseConnection: mongoose.connection,
          ttl: 14 * 24 * 60 * 60
      }) // store session @ mongodb
  }))
  // setup passport
  app.use(passport.initialize())
  app.use(passport.session())
  passportInit(passport)

  // ENABLE DEBUG WHEN DEV ENVIRONMENT
  if(process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
  }

  // catch all unhandled errors
  app.use((err, req, res, next) => {
    logger.error('unhandled application error: ', err)
    res.status(500).send(err)
  })
}
