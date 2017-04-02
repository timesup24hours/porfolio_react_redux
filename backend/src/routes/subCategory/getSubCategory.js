import { SubCategory } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/subCategory/:id', asyncRequest(async (req, res, next) => {

    let subCategory = null

    subCategory = await SubCategory.find({ type: req.params.id })

    if (subCategory === null) {
      res.status(400).json({ success: false, error: `no this '${req.params.id}' type was found` })
      return
    }

    res.status(200).json({ success: true, subCategory })
  }))

  app.get('/api/subCategory', asyncRequest(async (req, res, next) => {

    let subCategory = null

    subCategory = await SubCategory.find()

    res.status(200).json({ success: true, subCategory })
  }))


}
