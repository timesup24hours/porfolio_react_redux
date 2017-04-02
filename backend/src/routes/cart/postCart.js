import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Cart, Product } from '../../db/models'
import { asyncRequest, getProductsAndQuantitiesFromCartArray } from '../../util'

export default (app) => {

  /**********************
   * API: Add the product and quantity into the shopping cart
   * @param {String} req.body.productId - productId of the Product
   * @param {String} req.body.quantity - quantity of the Product
   */
  app.post('/api/cart', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { productId, quantity } = req.body

    if(!productId) {
      res.status(400).json({ success: false, error: { productId: 'productId is required' } })
      return
    }

    if(!quantity) {
      res.status(400).json({ success: false, error: { quantity: 'quantity is required' } })
      return
    }

    let cart = null

    cart = await Cart.findOne({ user: req.user._id })
    // *******************
    // another implementation
    // (not finish) just for note
    // not prefer
    // because it would not base on conditional to create the new document or increase quantity by one
    // *******************
    //   {
    //     $push : { 'cart': { productId, quantity } },
    //     $set: { 'user': req.user._id }
    //   },
    //   { safe: true, upsert: true, new : true }
    // )

    // if the cart is not exist, then create
    if(cart === null) {
      cart = new Cart()
      cart.cart = { productId, quantity: quantity }
      cart.user = req.user._id
      await cart.save()
    } else {
      let isProductInTheCart = false

      // see if any same product in the cart
      cart.cart = cart.cart.map((c) => {
        if(c.productId === productId) {
          isProductInTheCart = true
          c.quantity = quantity
        }
        return c
      })
      // push the new product into array if the product is not in inside the cart
      if(!isProductInTheCart) cart.cart.push({ productId, quantity: quantity })

      await cart.save()
    }

    let idsOfProduct = cart.cart.map(el => el.productId )
    let cartProducts = await Product.find({ _id: { $in: idsOfProduct } })
    res.status(200).json({ success: true, cart: cart.cart, cartProducts })

  }))


}
