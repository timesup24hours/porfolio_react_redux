'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hash = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hash = exports.hash = function hash(str) {
  var sum = _crypto2.default.createHash('sha256');
  sum.update(str + _config.auth.passwordSalt);
  return sum.digest('hex');
};