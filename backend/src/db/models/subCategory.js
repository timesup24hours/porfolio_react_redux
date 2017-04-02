import { mongoose, Schema } from '../../db'

const SubCategory = new Schema({
  name: { type: String, required: true },
  desc: { type: String },
  // children: [{ type: mongoose.Schema.Types.ObjectId, ref: '??' }],
})

export default mongoose.model('SubCategory', SubCategory)
