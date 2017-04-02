import { mongoose, Schema } from '../../db'

const Cart = new Schema({
  cart: [
    {
      'productId': String,
      'quantity': Number
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model('Cart', Cart)
