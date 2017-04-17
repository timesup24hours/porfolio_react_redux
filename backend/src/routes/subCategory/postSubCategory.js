import passport from 'passport'
import jwt from 'jsonwebtoken'
import { SubCategory, Category } from '../../db/models'
import { asyncRequest, getMenu, routeNameFormatToLink } from '../../util'

export default (app) => {

  app.post('/api/subCategory', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { name, desc, parentId } = req.body
    
    if(!name) {
      res.status(400).json({ errors: { name: 'name is required' } })
      return
    }

    let subCategory = null

    subCategory = new SubCategory()

    subCategory.name = unescape(name)
    subCategory.to = routeNameFormatToLink(unescape(name))
    if(desc) subCategory.desc = desc

    await subCategory.save()

    let category = await Category.findOneAndUpdate({ _id: parentId }, { $push: { "subCategoryId": subCategory._id } })
    // let department = await Department.update({ _id: departmentId }, { $push: { "categoryId": category._id } })

    let menu = await getMenu()

    res.status(201).json({ success: true, menu })
  }))


}
