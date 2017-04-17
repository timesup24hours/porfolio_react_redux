import passport from 'passport'
import { Product } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/products_by_owner', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    let products = await Product.find({ owner: req.user._id })

    res.status(200).json({ success: true, products })
  }))

}
