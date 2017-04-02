import passport from 'passport'
import { Cart, Product } from '../../db/models'
import { asyncRequest, getProductsAndQuantitiesFromCartArray } from '../../util'


export default (app) => {

  app.get('/api/cart', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    let cart = null

    // get the shopping cart object of the user
    cart = await Cart.findOne({ user: req.user._id })

    // if not shopping cart, then return the empty arrays
    if(cart === null) {
      res.json({ success: false, cart: [], cartProducts: [] })
      return
    }

    cart = cart.cart

    let idsProducts = cart.map(product => product.productId)
    let cartProducts = await Product.find({ _id: { $in: idsProducts } })
    cartProducts === null ? cartProducts = [] : null
    res.status(200).json({ success: true, cart, cartProducts })
  }))


}
