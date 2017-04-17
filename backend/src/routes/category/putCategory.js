import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Category } from '../../db/models'
import { asyncRequest, routeNameFormatToLink, getMenu } from '../../util'

export default (app) => {

  app.put('/api/eidt_category', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { id, name, desc, departmentId, subCategoryId } = req.body

    if(!id) {
      res.status(400).json({ error: { id: 'id is required' } })
      return
    }

    let category = null

    category = await Category.findOneAndUpdate({ _id: id },
      { $set:
        { "name": unescape(name),
          "to": routeNameFormatToLink(unescape(name))
        },
      })

    let menu = await getMenu()

    res.status(201).json({ success: true, menu })
  }))


}
