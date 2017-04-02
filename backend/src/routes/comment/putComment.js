import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Comment } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.put('/api/comment', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {
    if(!req.body.id) {
      res.send({ errors: { id: 'Id is required!' } })
      return
    }

    if(!req.body.comment) {
      res.send({ errors: { comment: 'Comment is required!' } })
      return
    }

    let comment = null

    comment = await Comment.findOne({ _id: req.body.id }).populate('user', '_id local.username')

    if(JSON.stringify(comment.user._id) !== JSON.stringify(req.user._id)) {
      res.send({ errors: { auth: 'You have no right to change this comment!' } })
      return
    }

    comment.comment = req.body.comment

    await comment.save()

    res.status(201).json({ success: true, comment })
  }))


}
