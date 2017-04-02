import { mongoose, Schema, config } from '../../db'

const Message = new Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Message', Message)
