import passport from 'passport'
import { Product } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.put('/api/delete_product', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const productId = req.body.id

    if(!productId) {
      res.status(400).json({ error: 'product id is required' })
      return
    }

    let product = await Product.findOne({ _id: productId, deleted: { $ne: true } })

    if(!product) {
      res.status(400).json({ success: true, error: 'no such product' })
      return
    }

    if(JSON.stringify(product.owner) !== JSON.stringify(req.user._id)) {
      res.status(400).json({ success: true, error: 'no right to delete' })
      return
    }

    product.deleted = true

    await product.save()

    // const deletedResult = await Product.remove({ _id: productId })
    //
    // if(deletedResult.result.n !== 1) {
    //   res.status(400).json({ error: 'fail to delete, could not find the product' })
    //   return
    // }

    res.status(202).json({ success: true, product })
    return
  }))

}
