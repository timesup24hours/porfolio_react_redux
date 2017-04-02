import passport from 'passport'
import jwt from 'jsonwebtoken'
import { SubCategory } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.post('/api/subCategory', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { name } = req.body

    if(!name) {
      res.status(400).json({ errors: { name: 'name is required' } })
      return
    }

    let subCategory = null

    subCategory = new SubCategory()

    subCategory.name = name

    await subCategory.save()

    res.status(201).json({ success: true, subCategory })
  }))


}
