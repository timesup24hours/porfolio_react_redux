'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postCart = require('./postCart');

var _postCart2 = _interopRequireDefault(_postCart);

var _getCart = require('./getCart');

var _getCart2 = _interopRequireDefault(_getCart);

var _deleteCart = require('./deleteCart');

var _deleteCart2 = _interopRequireDefault(_deleteCart);

var _putCart = require('./putCart');

var _putCart2 = _interopRequireDefault(_putCart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  (0, _postCart2.default)(app);
  (0, _getCart2.default)(app);
  (0, _deleteCart2.default)(app);
  (0, _putCart2.default)(app);
};