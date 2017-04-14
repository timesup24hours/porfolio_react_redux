import passport from 'passport'
import { Comment } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/comment', asyncRequest(async (req, res, next) => {

    let comments = await Comment.find({})
    .populate('user', 'local.username local.nickname')

    res.status(200).json({ success: true, comments })
  }))

  app.get('/api/comment_review/:id', asyncRequest(async (req, res, next) => {

    const id = req.params.id

    let reviews = await Comment.find({ productId: id })
    .populate('user', 'local.username local.nickname')

    res.status(200).json({ success: true, reviews })
  }))

}
