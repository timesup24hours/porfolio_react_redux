import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Comment } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.post('/api/comment', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    if(!req.body.comment) {
      res.status(400).send({ errors: { comment: 'Comment is required!' } })
      return
    }

    let comment = null

    comment = new Comment()

    comment.comment = req.body.comment
    comment.user = req.user._id
    if(req.body.productId) comment.productId = req.body.productId

    await comment.save()

    let reviews = await Comment.findOne({ _id: comment._id })
    .populate('user', '_id local.username local.nickname')

    res.status(201).json({ success: true, comment: reviews })
  }))


}
