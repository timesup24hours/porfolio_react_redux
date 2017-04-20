'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var Category = new _db.Schema({
  name: { type: String, required: true },
  to: { type: String },
  desc: { type: String },
  departmentId: { type: _db.mongoose.Schema.Types.ObjectId, ref: 'Department' },
  subCategoryId: [{ type: _db.mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]
});

exports.default = _db.mongoose.model('Category', Category);