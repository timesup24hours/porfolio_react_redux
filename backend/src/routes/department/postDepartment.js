import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Department } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.post('/api/department', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { name, categoryId } = req.body

    if(!name) {
      res.status(400).json({ errors: { name: 'name is required' } })
      return
    }

    let department = null

    department = new Department()

    department.name = name
    department.categoryId.push(categoryId)

    await department.save()

    res.status(201).json({ success: true, department })
  }))


}
