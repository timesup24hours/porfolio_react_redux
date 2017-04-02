import passport from 'passport'
import jwt from 'jsonwebtoken'
import { auth as authConfig } from '../../../config'

export default (app) => {

  app.post('/api/login', passport.authenticate('local-login'), (req, res) => {
    if(req.user) {
      const user = JSON.stringify(req.user)
      const token = jwt.sign(JSON.parse(user), authConfig.jwtSecret)
      res.status(200).json({ user, token })
    } else {
      res.status(401).json({ error: 'Error logging in!' })
    }
  })

}
