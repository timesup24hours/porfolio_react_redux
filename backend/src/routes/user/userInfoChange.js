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

    if(nickname) user.local.nickname = nickname
    if(email) user.email = email
    if(street) user.address.street = street
    if(city) user.address.city = city
    if(zipcode) user.address.zipcode = zipcode
    if(state) user.address.state = state
    if(cellphone) user.contact.cellphone = cellphone
    if(homephone) user.contact.homephone = homephone
    if(workphone) user.contact.workphone = workphone

    await user.save()

    user.local.password = undefined

    const token = jwt.sign(user, authConfig.jwtSecret)

    res.status(201).json({ user, token })
  }))


}
