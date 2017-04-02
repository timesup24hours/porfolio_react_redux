import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Comment } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.post('/api/comment', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    // await passport.authenticate('local-jwt', (err, user, info) => {
    //   if (err) { res.json({ errors: { general: err } }) }
    //   if (!user) { res.json({ errors: { general: 'Must be Login' } }) }
    //
    //   req.login(user, function(err) {
    //     if (err) { return next(err) }
    //   })
    //
    // })(req, res, next)

    if(!req.body.comment) {
      res.status(400).send({ errors: { comment: 'Comment is required!' } })
      return
    }

    let comment = null

    comment = new Comment({
      comment: req.body.comment,
      user: req.user
    })

    await comment.save()

    res.status(201).json({ success: true, comment })
  }))


}
