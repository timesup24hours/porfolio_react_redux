import { Category } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/category/:id', asyncRequest(async (req, res, next) => {

    let category = null

    category = await Category.find({ type: req.params.id })

    if (category === null) {
      res.status(400).json({ success: false, error: `no this '${req.params.id}' type was found` })
      return
    }

    res.status(200).json({ success: true, category })
  }))

  app.get('/api/category', asyncRequest(async (req, res, next) => {

    let category = null

    category = await Category.find()

    res.status(200).json({ success: true, category })
  }))


}
