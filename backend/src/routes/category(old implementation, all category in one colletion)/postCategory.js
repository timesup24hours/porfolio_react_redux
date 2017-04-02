import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Category } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.post('/api/category', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { name, children, type } = req.body

    if(!name) {
      res.status(400).json({ errors: { name: 'name is required' } })
      return
    }

    if(!type) {
      res.status(400).json({ errors: { type: 'type is required' } })
      return
    }

    let category = null

    category = new Category

    category.name = name
    if(children) category.children = children
    category.type = type

    await category.save()

    res.status(201).json({ success: true, category })
  }))


}
