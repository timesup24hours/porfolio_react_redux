import { mongoose, Schema, config } from '../../db'

const Comment = new Schema({
  comment: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Comment', Comment)
