import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Department } from '../../db/models'
import { asyncRequest, getMenu, routeNameFormatToLink } from '../../util'

export default (app) => {

  app.post('/api/department', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {
    const { name, desc, categoryId } = req.body

    if(!name) {
      res.status(400).json({ errors: { name: 'name is required' } })
      return
    }

    let department = null

    department = new Department()

    department.name = unescape(name)
    department.to = routeNameFormatToLink(name)
    if(desc) department.desc = desc

    await department.save()

    let menu = await getMenu()

    res.status(201).json({ success: true, menu })

  }))

}
