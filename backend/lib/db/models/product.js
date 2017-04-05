'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var Product = new _db.Schema({
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
  department: String,
  category: String,
  type: String,
  stock: { type: Boolean },
  numberOfStock: { type: Number },
  onSale: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  size: { type: String },
  soldBy: { type: String }
});

// let autoPopulateLead = function (next) {
// this.populate('department')
// this.populate('category')
// this.populate('type')
// this.populate({
//     path: 'category',
//     model: 'Category',
//   })
// this.populate('category')
//   next()
// };
//
// Product.
//   pre('findOne', autoPopulateLead).
//   pre('find', autoPopulateLead)

exports.default = _db.mongoose.model('Product', Product);