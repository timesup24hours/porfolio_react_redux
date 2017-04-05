'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getAllProduct = require('./getAllProduct');

var _getAllProduct2 = _interopRequireDefault(_getAllProduct);

var _getOneProduct = require('./getOneProduct');

var _getOneProduct2 = _interopRequireDefault(_getOneProduct);

var _addProduct = require('./addProduct');

var _addProduct2 = _interopRequireDefault(_addProduct);

var _deleteProduct = require('./deleteProduct');

var _deleteProduct2 = _interopRequireDefault(_deleteProduct);

var _getByCategoryProduct = require('./getByCategoryProduct');

var _getByCategoryProduct2 = _interopRequireDefault(_getByCategoryProduct);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  (0, _getAllProduct2.default)(app);
  (0, _getOneProduct2.default)(app);
  (0, _addProduct2.default)(app);
  (0, _deleteProduct2.default)(app);
  (0, _getByCategoryProduct2.default)(app);
};