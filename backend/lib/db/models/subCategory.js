'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var SubCategory = new _db.Schema({
  name: { type: String, required: true },
  to: { type: String },
  desc: { type: String }
});

exports.default = _db.mongoose.model('SubCategory', SubCategory);