import passport from 'passport'
import { Product } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.delete('/api/product', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {
    const productId = req.body.id

    if(!productId) {
      res.status(400).json({ error: 'product id is required' })
      return
    }

    const deletedResult = await Product.remove({ _id: productId })

    if(deletedResult.result.n !== 1) {
      res.status(400).json({ error: 'fail to delete, could not find the product' })
      return
    }

    res.status(202).json({ success: true, productId })
    return
  }))

}
