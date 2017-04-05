import local from './local'
import jwt from './jwt'

import { User } from '../../db/models'

export default (passport) => {
  // define serialize and deserialize functions
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    let user = null
    try {
      user = await User.findById(id)
    } catch(e) {
      done(e)
      return
    }
    done(null, user)
    return
  })

  jwt(passport)
  local(passport)
}
