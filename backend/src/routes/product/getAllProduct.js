import { Product } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/products', asyncRequest(async (req, res, next) => {

    let products = await Product.find({})

    res.status(200).json({ success: true, products })
  }))

}
