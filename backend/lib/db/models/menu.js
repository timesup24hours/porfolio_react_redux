'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var menu = new _db.Schema({
  name: { type: String, required: true },
  type: { type: String },
  belong: { type: _db.mongoose.Schema.Types.ObjectId, ref: 'Menu' }
});

exports.default = _db.mongoose.model('Menu', menu);