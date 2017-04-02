import passport from 'passport'
import jwt from 'jsonwebtoken'
import { SubCategory } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.put('/api/subCategory', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { id, name, categoryId } = req.body

    if(!id) {
      res.status(400).json({ error: { id: 'id is required' } })
      return
    }

    let subCategory = null

    subCategory = await SubCategory.findOne({ _id: id })

    if(name) subCategory.name = name
    if(categoryId) subCategory.categoryId = categoryId

    await subCategory.save()

    res.status(201).json({ success: true, subCategory })
  }))


}
