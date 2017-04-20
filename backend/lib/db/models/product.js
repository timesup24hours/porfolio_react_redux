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
  department: { type: _db.mongoose.Schema.Types.ObjectId, ref: 'Department' },
  category: { type: _db.mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subCategory: { type: _db.mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  stock: { type: Boolean },
  numberOfStock: { type: Number },
  onSale: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  size: { type: String },
  soldBy: { type: String },
  owner: { type: _db.mongoose.Schema.Types.ObjectId, ref: 'User' },
  deleted: { type: Boolean, default: false }
});

var autoPopulateLead = function autoPopulateLead(next) {
  this.populate('department');
  this.populate('category');
  this.populate('subCategory');
  this.populate({
    path: 'category',
    model: 'Category'
  });
  this.populate('category');
  next();
};

Product.pre('findOne', autoPopulateLead).pre('find', autoPopulateLead);

exports.default = _db.mongoose.model('Product', Product);