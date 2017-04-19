import { Product } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/products', asyncRequest(async (req, res, next) => {

    let products = await Product.find({ deleted: { $ne: true } })

    res.status(200).json({ success: true, products })
  }))

}
