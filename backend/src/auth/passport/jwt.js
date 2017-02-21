import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
// import jwt from 'jsonwebtoken'
import { auth as authConfig } from '../../../config'

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
  secretOrKey: authConfig.jwtSecret,
}

export default (passport) => {

  // use JWTStrategy
  passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
    let user = null
    try {
      user = await User.findById(payload.id)
    } catch(e) {
      done(e)
      return
    }
    // check if exists
    if (!user) {
      done(null, false)
      return
    }
    // return user if successful
      done(null, user)
      return
  }))
  
}
