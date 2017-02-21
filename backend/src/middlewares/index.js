import bodyParser from 'body-parser'
import passport from 'passport'
import { auth as authConfig } from '../../config'
import session from 'express-session'
import morgan from 'morgan'
import cors from 'cors'
import { logger } from '../util'
import passportInit from '../auth/passport'
import path from 'path'

export default (app) => {
  console.log(path.join(__dirname, '../../../frontend/build'));
  // app.use(express.static('public'))
  // setup logging
  app.use(morgan('combined', {stream: logger.stream}))
  // setup CORS
  app.use(cors())
  // add body parsing
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
      secret: authConfig.sessionSecret,
      saveUninitialized: false,
      resave: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  passportInit(passport)

  // catch all unhandled errors
  app.use((err, req, res, next) => {
    logger.error('unhandled application error: ', err)
    res.status(500).send(err)
  })
}
