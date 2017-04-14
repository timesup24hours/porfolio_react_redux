import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Review } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.put('/api/review', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    if(!req.body.id) {
      res.send({ errors: { id: 'Id is required!' } })
      return
    }

    if(!req.body.review) {
      res.send({ errors: { review: 'Review is required!' } })
      return
    }

    let review = null

    review = await Review.findOne({ _id: req.body.id }).populate('user', '_id local.username')

    if(JSON.stringify(review.user._id) !== JSON.stringify(req.user._id)) {
      res.send({ errors: { auth: 'You have no right to change this review!' } })
      return
    }

    review.review = req.body.review

    await review.save()

    res.status(201).json({ success: true, review })
  }))


}
