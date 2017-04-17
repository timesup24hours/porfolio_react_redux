import { mongoose, Schema } from '../../db'

const Product = new Schema({
  name: { type: String, required: true },
  brand: { type: String },
  price: { type: Number },
  salePrice: { type: Number },
  listDesc: { type: Array },
  desc: { type: String },
  images: { type: Array },
  // department: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  // type: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  stock: { type: Boolean },
  numberOfStock: { type: Number },
  onSale: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  size: { type: String },
  soldBy: { type: String },
})

let autoPopulateLead = function (next) {
  this.populate('department')
  this.populate('category')
  this.populate('subCategory')
  this.populate({
      path: 'category',
      model: 'Category',
    })
  this.populate('category')
  next()
};

Product.
  pre('findOne', autoPopulateLead).
  pre('find', autoPopulateLead)

export default mongoose.model('Product', Product)
