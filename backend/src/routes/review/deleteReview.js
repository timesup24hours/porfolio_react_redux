import passport from 'passport'
import { Review } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.delete('/api/review/:id', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {
    const reviewId = req.params.id
    let review = null

    if(!reviewId) {
      res.status(400).json({ error: 'fail to delete' })
      return
    }

    review = await Review.findById(reviewId)

    if(!review) {
      res.status(400).json({ error: 'review has been deleted' })
      return
    }

    if(JSON.stringify(req.user._id) !== JSON.stringify(review.user)) {
      res.status(401).json({ error: 'no right to delete' })
      return
    }

    const deletedResult = await Review.remove({ _id: reviewId })
    res.status(202).json({ deletedResult: deletedResult.result.n, reviewId })

  }))

}
