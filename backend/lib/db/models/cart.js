'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var Cart = new _db.Schema({
  cart: [{
    'productId': String,
    'quantity': Number
  }],
  user: { type: _db.mongoose.Schema.Types.ObjectId, ref: 'User' }
});

exports.default = _db.mongoose.model('Cart', Cart);