import { mongoose, Schema } from '../../db'

const Department = new Schema({
  name: { type: String, required: true },
  to: { type: String },
  desc: { type: String },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
})

export default mongoose.model('Department', Department)
