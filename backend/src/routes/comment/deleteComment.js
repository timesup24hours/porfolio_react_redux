import passport from 'passport'
import { Comment } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.delete('/api/comment/:id', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {
    const commentId = req.params.id
    let comment = null

    if(!commentId) {
      res.status(400).json({ error: 'fail to delete' })
      return
    }

    comment = await Comment.findById(commentId)

    if(!comment) {
      res.status(400).json({ error: 'comment has been deleted' })
      return
    }

    if(JSON.stringify(req.user._id) !== JSON.stringify(comment.user)) {
      res.status(401).json({ error: 'no right to delete' })
      return
    }

    const deletedResult = await Comment.remove({ _id: commentId })
    res.status(202).json({ deletedResult: deletedResult.result.n, commentId })

  }))

}
