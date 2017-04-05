'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getCategory = require('./getCategory');

var _getCategory2 = _interopRequireDefault(_getCategory);

var _postCategory = require('./postCategory');

var _postCategory2 = _interopRequireDefault(_postCategory);

var _putCategory = require('./putCategory');

var _putCategory2 = _interopRequireDefault(_putCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  (0, _getCategory2.default)(app);
  (0, _postCategory2.default)(app);
  (0, _putCategory2.default)(app);
};