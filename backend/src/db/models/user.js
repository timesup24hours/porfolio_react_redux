import { mongoose, Schema, config } from '../../db'

const User = new Schema({
  local: {
    username: { type: String, unique: true, required: true },
    nickname: { type: String },
    password: { type: String, required: true }
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: Number },
  },
  contact: {
    cellphone: { type: String },
    homephone: { type: String },
    workphone: { type: String },
  },
  email: { type: String }
})

export default mongoose.model('User', User)
