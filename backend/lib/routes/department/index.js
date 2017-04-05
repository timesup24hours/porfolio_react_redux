'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getDepartment = require('./getDepartment');

var _getDepartment2 = _interopRequireDefault(_getDepartment);

var _postDepartment = require('./postDepartment');

var _postDepartment2 = _interopRequireDefault(_postDepartment);

var _putDepartment = require('./putDepartment');

var _putDepartment2 = _interopRequireDefault(_putDepartment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  (0, _getDepartment2.default)(app);
  (0, _postDepartment2.default)(app);
  (0, _putDepartment2.default)(app);
};