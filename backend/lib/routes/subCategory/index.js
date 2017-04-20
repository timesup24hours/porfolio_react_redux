'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getSubCategory = require('./getSubCategory');

var _getSubCategory2 = _interopRequireDefault(_getSubCategory);

var _postSubCategory = require('./postSubCategory');

var _postSubCategory2 = _interopRequireDefault(_postSubCategory);

var _putSubCategory = require('./putSubCategory');

var _putSubCategory2 = _interopRequireDefault(_putSubCategory);

var _deleteSubCategory = require('./deleteSubCategory');

var _deleteSubCategory2 = _interopRequireDefault(_deleteSubCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  (0, _getSubCategory2.default)(app);
  (0, _postSubCategory2.default)(app);
  (0, _putSubCategory2.default)(app);
  (0, _deleteSubCategory2.default)(app);
};