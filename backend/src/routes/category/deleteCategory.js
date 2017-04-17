import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Department, Category } from '../../db/models'
import { asyncRequest, getMenu } from '../../util'

export default (app) => {

  app.put('/api/delete_category', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    const { id } = req.body

    const deletedResult = await Category.remove({ _id: id })

    if(deletedResult.result.n !== 1) {
      res.status(400).json({ error: 'fail to delete, could not find the category' })
      return
    }

    let menu = await getMenu()

    res.status(202).json({ success: true, menu })
  }))

}
