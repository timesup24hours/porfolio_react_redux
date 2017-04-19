import { Product } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/products/:id', asyncRequest(async (req, res, next) => {

    let product = null

    product = await Product.findOne({ _id: req.params.id, deleted: { $ne: true } })

    if(!product) {
      res.status(400).json({ success: false })
      return
    }

    res.status(200).json({ success: true, product })
  }))

}
