import passport from 'passport'
import jwt from 'jsonwebtoken'
import { User } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.put('/api/userInfoChange', passport.authenticate('local-jwt'), asyncRequest(async (req, res) => {
    if(!req.user) {
      res.status(401).send({ error: 'Need to be login!' })
      return
    }

    const { nickname, email, street, city, state, zipcode, cellphone, homephone, workphone } = req.body
    let user = null

    user = await User.findOne({ _id: req.user._id })

    if(!user) {
      res.status(400).send({ error: 'user has been deleted!' })
      return
    }

    user.local.nickname = nickname
    user.email = email
    user.address.street = street
    user.address.city = city
    user.address.zipcode = zipcode
    user.address.state = state
    user.contact.cellphone = cellphone
    user.contact.homephone = homephone
    user.contact.workphone = workphone

    await user.save()

    user.local.password = undefined

    const token = jwt.sign(user, authConfig.jwtSecret)

    res.status(201).json({ user, token })
  }))


}
