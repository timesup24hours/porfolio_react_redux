import { Strategy as LocalStrategy } from 'passport-local'
import { hash } from '../../util'
import { User } from '../../db/models'
import { logger } from '../../util'

export default (passport) => {
  // use local-login
  passport.use('local-login',
    new LocalStrategy({ usernameField: 'username' },
    async (username, password, done) => {
      // find all users with matching login
      let user = null
      try {
        user = await User.findOne({ 'local.username': username })
      } catch (e) {
        done(e)
        return
      }

      // check if exists
      if (!user) {
        done(null, false, { error: 'username doesn\'t exist!' })
        return
      }
      // compare password
      if (user.local.password !== hash(password)) {
        done(null, false, { error: 'Password must be match!' })
        return
      }

      user.local.password = undefined
      // delete user.local.password // couldn't delete the property, maybe because it inherits from somewhere

      done(null, user)
      return
  }))

  // use local-signup
  passport.use('local-signup',
    new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true },
    async (req, username, password, done) => {
      let user = null
      try {
        user = await User.findOne({ 'local.username': username })
      } catch(e) {
        done(null, false, { error: 'Missing credential!' })
      }

      if(user) {
        done(null, false, { error: 'This username is already taken!' })
        return
      }

      const newUser = new User()
      newUser.local.username = username
      newUser.local.password = hash(password)

      try {
        await newUser.save()
      } catch(e) {
        done(e, false)
        return
      }

      newUser.local.password = undefined
      done(null, newUser)
      return
    }
  ))

}
