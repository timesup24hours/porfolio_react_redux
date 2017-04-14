import { mongoose, Schema, config } from '../../db'

const Review = new Schema({
  review: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  images: [],
  createdAt: { type: Date, default: Date.now },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
})

export default mongoose.model('Review', Review)
