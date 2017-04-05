'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var Message = new _db.Schema({
  content: { type: String, required: true },
  user: { type: _db.mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

exports.default = _db.mongoose.model('Message', Message);