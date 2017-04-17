import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Department } from '../../db/models'
import { asyncRequest, getMenu, routeNameFormatToLink } from '../../util'

export default (app) => {

  app.put('/api/department', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { id, name, categoryId } = req.body
    
    if(!id) {
      res.status(400).json({ error: { id: 'id is required' } })
      return
    }

    if(!name) {
      res.status(400).json({ error: { name: 'name is required' } })
      return
    }

    let department = null

    department = await Department.findOne({ _id: id })

    if(name) department.name = unescape(name)
    department.to = routeNameFormatToLink(unescape(name))
    if(categoryId) department.categoryId = categoryId

    await department.save()

    let menu = await getMenu()

    res.status(201).json({ success: true, menu })
  }))

  app.put('/api/department_edit', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { id, name, categoryId } = req.body

    // if(!id) {
    //   res.status(400).json({ error: { id: 'id is required' } })
    //   return
    // }

    let department = null

    department = await Department.findOneAndUpdate({ _id: '58da166f1903e9d353b7a909' },
      {
        $push: {
          categoryId: "58db1b1d6d675f0e398766c3",
        },
      },
      { upsert: true, new: true },
    )

    // if(name) department.name = name
    // if(categoryId) department.categoryId = categoryId

    // await department.save()

    res.status(201).json({ success: true, department })
  }))


}
