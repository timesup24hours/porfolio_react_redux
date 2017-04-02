import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Cart, Product } from '../../db/models'
import { asyncRequest, getProductsAndQuantitiesFromCartArray } from '../../util'

export default (app) => {

  /**********************
   * API: change the quantity of the Product inside of the shopping cart
   * @param {string} req.body.productId - productId of the Product
   * @param {string} req.body.quantity - quantity of the Product
   */
  app.put('/api/cart/changeQuantity', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

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

    // find the one and update, if not exist then create
    cart = await Cart.findOneAndUpdate({ user: req.user._id, 'cart.productId': productId },
      {
        $set: { 'cart.$.quantity': quantity },
      },
      // safe: true (pass error to callback)
      // upsert: true (create new document if not exist)
      // new: true (return the modified document, instead of the original)
      { safe: true, upsert: true, new: true }
    ) // get the existing cart

    // assign the cart array inside the cart object to the cart variable
    cart = cart.cart
    // get the all productId from the cart array
    let idsProduct = cart.map(c => c.productId)
    // find all the Product object associate with the productId
    let cartProducts = await Product.find({ _id: { $in: idsProduct } })

    res.status(200).json({ success: true, cart, cartProducts })

  }))

  /**********************
   * API: Remove the product from the shopping cart
   * @param {string} productId - productId of the Product object
   */
  app.put('/api/cart/removeProductFromCart', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { productId } = req.body

    if(!productId) {
      res.status(400).json({ success: false, error: { productId: 'productId is required' } })
      return
    }

    let cart = null

    // delete($pull) the product which associate with the productId from the cart array,
    // base on the condition
    cart = await Cart.update(
      // condition
      { user: req.user._id, 'cart.productId': productId },
      // update
      {
        $pull: { cart: { productId: productId } },
      },
      // option
      { new: true }
    )

    // if remove success, then return status 200, otherwise return status 400
    if(cart.nModified === 1) {
      res.status(200).json({ success: true, productId: productId })
      return
    } else {
      res.status(400).json({ success: false, productId: productId })
      return
    }

    // cart = cart.cart
    // let idsProduct = cart.map(product => product._id )
    // let cartProducts = await Product.find({ _id: { $in: idsProduct } })
    // res.status(200).json({ success: true, cart, cartProducts })


  }))

  /**********************
   * API: Decrease one quantity of the product from the shopping cart
   * @param {string} productId - productId of the Product object
   */
  app.put('/api/cart/subtractOneQuantity', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { productId } = req.body

    if(!productId) {
      res.status(400).json({ success: false, error: { productId: 'productId is required' } })
      return
    }

    let cart = null

    // find the product inside the cart
    cart = await Cart.findOne({ user: req.user._id, 'cart.productId': productId })

    // if no cart is found, then return
    if(cart === null) {
      res.status(400).json({ success: false, error: 'fail to delete, please try again' })
      return
    }

    // descrease quantity or filter from the array if quantity is 0
    cart.cart = cart.cart.filter(c => {
      if(c.productId === productId) {
        c.quantity--
      }
      if(c.quantity > 0) {
        return c
      }
    })

    // try to save
    await cart.save()

    // get the IDs inside the cart
    let idsProduct = cart.cart.map(p => p.productId)
    // get the product object of the IDs from the Product collection
    let cartProducts = await Product.find({ _id: { $in: idsProduct } })

     /*********************
      * @param {Array{}} cart - { productId: String, quantity: Number }
      * @param {Array{}} cartProducts - Array of Product object
      */
    res.status(200).json({ success: true, cart: cart.cart, cartProducts })

  }))

  /**********************
   * API: Increase one quantity of the product into the shopping cart
   * @param {string} productId - productId of the Product object
   */
  app.put('/api/cart/increaseOneQuantity', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { productId } = req.body

    if(!productId) {
      res.status(400).json({ success: false, error: { productId: 'productId is required' } })
      return
    }

    let cart = null

    cart = await Cart.findOne({ user: req.user._id })

    // if the cart is not exist, then create
    if(cart === null) {
      cart = new Cart()
      cart.cart = { productId, quantity: 1 }
      cart.user = req.user._id
      await cart.save()
    } else {
      let isProductInTheCart = false

      // see if any same product in the cart
      cart.cart = cart.cart.map((c) => {
        if(c.productId === productId) {
          isProductInTheCart = true
          c.quantity++
        }
        return c
      })

      // push the new product into array if the product is not in inside the cart
      if(!isProductInTheCart) cart.cart.push({ productId, quantity: 1 })

      await cart.save()
    }

    let idsOfProduct = cart.cart.map(el => el.productId )
    let cartProducts = await Product.find({ _id: { $in: idsOfProduct } })
    res.status(200).json({ success: true, cart: cart.cart, cartProducts })

  }))


}
