import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Menu } from '../../db/models'
import { asyncRequest } from '../../util'
var ObjectId = require('mongoose').Types.ObjectId; // new ObjectId('58db5e91db917414692734b4')

export default (app) => {

  app.post('/api/test', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    let menu = new Menu()

    menu.name = 'sleeping bag'
    menu.type = 'subcategory'
    menu.belong = new ObjectId('58db5e91db917414692734b4')

    await menu.save()

    res.status(201).json({ success: true, menu })
  }))

  app.put('/api/test', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    let menu
    menu = await Menu.update( { _id: "58db5e578cae901454b39b25" }, { $set: {  "belong": "58db5e46ffbd69144d24f9a2"  }   } )
//58db5c1c99daa013fcbe6ace
    res.status(201).json({ success: true, menu })
  }))


}
