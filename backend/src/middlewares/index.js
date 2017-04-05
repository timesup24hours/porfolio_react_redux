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

export default (app) => {
  console.log(path.join(__dirname, '../../../frontend/build'))
  if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../../frontend/build')))
  } else {
    app.use(express.static(path.join(__dirname, '../../../frontend/public')))
  }

  // setup logging
  if(process.env.NODE_ENV !== 'test')
    app.use(morgan('combined', { stream: logger.stream }))
  // setup CORS
  app.use(cors())
  // add body parsing
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
      secret: authConfig.sessionSecret,
      saveUninitialized: false,
      resave: false,
  }))
  // setup passport
  app.use(passport.initialize())
  app.use(passport.session())
  passportInit(passport)

  // catch all unhandled errors
  app.use((err, req, res, next) => {
    logger.error('unhandled application error: ', err)
    res.status(500).send(err)
  })
}
