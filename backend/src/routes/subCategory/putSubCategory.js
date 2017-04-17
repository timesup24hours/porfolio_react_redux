import passport from 'passport'
import jwt from 'jsonwebtoken'
import { SubCategory } from '../../db/models'
import { asyncRequest, routeNameFormatToLink, getMenu } from '../../util'

export default (app) => {

  app.put('/api/edit_subCategory', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { id, name, parentId } = req.body

    if(!id) {
      res.status(400).json({ error: { id: 'id is required' } })
      return
    }

    let subCategory = null

    subCategory = await SubCategory.findOneAndUpdate({ _id: id },
      { $set:
        { "name": unescape(name),
          "to": routeNameFormatToLink(unescape(name))
        },
      })

    let menu = await getMenu()

    res.status(201).json({ success: true, menu })
  }))


}
