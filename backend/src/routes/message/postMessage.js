import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Message } from '../../db/models'
import { auth as authConfig } from '../../../config'
import { asyncRequest } from '../../util'

export default (app) => {

  app.post('/api/message', passport.authenticate('local-jwt'), asyncRequest(async (req, res) => {
    if(!req.user) {
      res.status(401).send({ error: 'Need to be login!' })
      return
    }
    if(!req.body.content) {
      res.status(400).send({ error: 'content is required!' })
      return
    }

    let message = null

    message = new Message({
      content: req.body.content,
      user: req.user
    })

    await message.save()

    res.status(201).json(message)
  }))


}
