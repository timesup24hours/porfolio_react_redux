import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Department, Category } from '../../db/models'
import { asyncRequest, getMenu, routeNameFormatToLink } from '../../util'

export default (app) => {

  app.post('/api/category', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { name, subCategoryId, parentId, desc } = req.body

    if(!name) {
      res.status(400).json({ errors: { name: 'name is required' } })
      return
    }

    let category = null

    category = new Category()

    category.name = unescape(name)
    category.to = routeNameFormatToLink(unescape(name))
    if(desc) category.desc = desc
    category.departmentId = parentId
    if(subCategoryId) category.subCategory.push(subCategoryId)

    await category.save()
    console.log(category._id);
    let department = await Department.findOneAndUpdate({ _id: parentId }, { $push: { "category": category._id } })
    // let department = await Department.update({ _id: departmentId }, { $push: { "categoryId": category._id } })

    let menu = await getMenu()

    res.status(201).json({ success: true, menu })
  }))


}
