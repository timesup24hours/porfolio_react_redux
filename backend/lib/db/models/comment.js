'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var Comment = new _db.Schema({
  comment: { type: String, required: true },
  user: { type: _db.mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

exports.default = _db.mongoose.model('Comment', Comment);