import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Review } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.post('/api/review', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    if(!req.body.review) {
      res.status(400).send({ errors: { review: 'review is required!' } })
      return
    }

    if(!req.body.productId) {
      res.status(400).send({ errors: { productId: 'productId is required!' } })
      return
    }

    let review = null

    review = new Review()

    review.review = req.body.review
    review.user = req.user._id
    review.productId = req.body.productId

    await review.save()

    let reviews = await Review.findOne({ _id: review._id })
    .populate('user', '_id local.username local.nickname')

    res.status(201).json({ success: true, review: reviews })
  }))


}
