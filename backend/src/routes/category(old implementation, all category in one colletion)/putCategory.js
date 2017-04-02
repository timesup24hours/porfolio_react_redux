import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Category } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.put('/api/category', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { field, value, id, childrenId } = req.body

    if(!id) {
      res.status(400).json({ errors: { id: 'Id is required' } })
      return
    }

    let category = null

    if(childrenId) {
      category = await Category.findOneAndUpdate({ _id: id, "children._id": childrenId },
        {
          $set: { [field]: value },
        },
        { new: true }
      )
    } else {
      category = await Category.findOneAndUpdate({ _id: id },
        {
          $set: { [field]: value },
        },
        { new: true }
      )
    }

    res.status(201).json({ success: true, category })
  }))


}
