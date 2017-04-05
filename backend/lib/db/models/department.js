'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var Department = new _db.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  categoryId: [{ type: _db.mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

exports.default = _db.mongoose.model('Department', Department);