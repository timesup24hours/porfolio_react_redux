import passport from 'passport'
import { Review } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/review', asyncRequest(async (req, res, next) => {

    let review = await Review.find({})
    .populate('user', 'local.username local.nickname')

    res.status(200).json({ success: true, review })
  }))

  app.get('/api/review/:id', asyncRequest(async (req, res, next) => {

    const id = req.params.id

    let review = await Review.find({ productId: id })
    .populate('user', 'local.username local.nickname')

    res.status(200).json({ success: true, review })
  }))

}
