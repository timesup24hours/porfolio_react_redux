import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Cart, Product } from '../../db/models'
import { asyncRequest, getProductsAndQuantitiesFromCartArray } from '../../util'

export default (app) => {

  app.put('/api/cart_empty', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const deletedResult = await Cart.remove({ user: req.user._id })

    if(deletedResult.result.n !== 1) {
      res.status(400).json({ error: 'fail to delete, could not find the cart' })
      return
    }

    res.status(202).json({ success: true })
    return
  }))

}
