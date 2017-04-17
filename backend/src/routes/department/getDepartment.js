import { Department, Category } from '../../db/models'
import { asyncRequest, getMenu } from '../../util'

export default (app) => {

  app.get('/api/department/:id', asyncRequest(async (req, res, next) => {

    let department = null

    department = await Department.find({ type: req.params.id })

    if (department === null) {
      res.status(400).json({ success: false, error: `no this '${req.params.id}' type was found` })
      return
    }

    res.status(200).json({ success: true, department })
  }))

  app.get('/api/department', asyncRequest(async (req, res, next) => {

    let department = null

    department = await Department.find()

    res.status(200).json({ success: true, department })
  }))

  app.get('/api/menu', asyncRequest(async (req, res, next) => {

    let menu = null

    menu = await getMenu()

    res.status(200).json({ success: true, menu })
  }))

}
