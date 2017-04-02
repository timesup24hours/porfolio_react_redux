import passport from 'passport'
import inspector from 'schema-inspector'
import { asyncRequest } from '../../util'
import User from '../../db/models/user'

export default (app) => {

  app.post('/api/signup', (req, res, next) => {
    if(validateSignupBody(req.body).error.length > 0) {
      return res.status(400).json({ error: 'validation fail' })
    }

    passport.authenticate('local-signup', (err, user, error) => {
      if(err) res.status(500).json(err)
      if(user) res.status(201).json({ message: 'Sign up successful!', username: user.local.username })
      if(error && error.message) res.status(400).json(error.message)
      if(error && error.error) res.status(409).json(error.error)
    })(req, res, next)

  })

  app.post('/api/isUserExist', async (req, res, next) => {
    const error = {
      username: ''
    }

    if(!req.body.username) {
      res.json({ err: 'Username is required' })
      return
    }

    const users = await User.findOne({ 'local.username': req.body.username })

    if(!users) {
      res.status(200).json({ success: 'Username is available' })
      return
    }

    if(users.local.username === req.body.username) {
      error.username = 'Username is taken'
    }

    if(error.username === '') {
      res.status(200).json({ success: 'Username is available' })
      return
    }

    res.json(error)
    return

  })


}

function validateSignupBody(body) {
  const validation = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        pattern: /^[0-9a-z_]{1,20}$/
      },
      password: {
        type: 'string',
        minLength: 2,
        eq: body.passwordConfirm
      },
      passwordConfirm: {
        type: 'string',
        minLength: 2,
        eq: body.password
      },
      // familyName: {
      //     type: 'string',
      //     minLength: 1
      // },
      // givenName: {
      //     type: 'string',
      //     minLength: 1
      // },
      // gender: {
      //     type: 'string',
      //     pattern: /(male|female)$/
      // },
      // email: {
      //     type: 'string',
      //     pattern: 'email'
      // }
    }
  };

    return inspector.validate(validation, body);
}
