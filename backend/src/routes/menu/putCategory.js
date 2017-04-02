import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Category } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.put('/api/category', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { id, name, desc, departmentId, subCategoryId } = req.body

    if(!id) {
      res.status(400).json({ error: { id: 'id is required' } })
      return
    }

    let category = null

    category = await Category.findOneAndUpdate({ _id: id }, { $set: { "departmentId": departmentId } })
    
    // if(name) category.name = name
    // if(desc) category.desc = desc
    // if(departmentId) category.departmentId
    // if(subCategoryId) category.subCategoryId.push(subCategoryId)
    //
    // await category.save()

    res.status(201).json({ success: true, category })
  }))


}
