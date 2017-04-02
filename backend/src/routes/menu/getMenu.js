import { Menu } from '../../db/models'
import { asyncRequest } from '../../util'
export default (app) => {

  // app.get('/api/test', asyncRequest(async (req, res, next) => {
  //
  //   let menu = await Menu.find().populate(
  //     {
  //        path: 'children',
  //          populate: {
  //          path: 'children',
  //        }
  //   }).where('type').equals('department')
  //
  //   res.status(200).json({ success: true, menu })
  // }))

  app.get('/api/test', asyncRequest(async (req, res, next) => {

    let menu = await Menu.find()
    // .populate(
    //     {
    //        path: 'belong',
    //          populate: {
    //          path: 'belong',
    //        }
    //   }).where('type').equals('subcategory')

    res.status(200).json({ success: true, menu })
  }))


}
