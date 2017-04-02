import { mongoose, Schema } from '../../db'

const menu = new Schema({
  name: { type: String, required: true },
  type: { type: String },
  belong: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
  // children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
})

export default mongoose.model('Menu', menu)
