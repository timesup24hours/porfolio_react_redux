import mongoose, { Schema } from 'mongoose'
import config from '../../config'
mongoose.Promise = global.Promise

export {
  mongoose,
  Schema,
  config
}
