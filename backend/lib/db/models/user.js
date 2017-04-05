'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var User = new _db.Schema({
  local: {
    username: { type: String, unique: true, required: true },
    nickname: { type: String },
    password: { type: String, required: true }
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: Number }
  },
  contact: {
    cellphone: { type: String },
    homephone: { type: String },
    workphone: { type: String }
  },
  email: { type: String }
});

exports.default = _db.mongoose.model('User', User);