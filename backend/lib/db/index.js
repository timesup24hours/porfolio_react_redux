'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.Schema = exports.mongoose = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

exports.mongoose = _mongoose2.default;
exports.Schema = _mongoose.Schema;
exports.config = _config2.default;