'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _product = require('./product');

var _product2 = _interopRequireDefault(_product);

var _cart = require('./cart');

var _cart2 = _interopRequireDefault(_cart);

var _department = require('./department');

var _department2 = _interopRequireDefault(_department);

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

var _subCategory = require('./subCategory');

var _subCategory2 = _interopRequireDefault(_subCategory);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _charge = require('./charge');

var _charge2 = _interopRequireDefault(_charge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
   (0, _auth2.default)(app);
   (0, _message2.default)(app);
   (0, _comment2.default)(app);
   (0, _user2.default)(app);
   (0, _product2.default)(app);
   (0, _cart2.default)(app);
   (0, _department2.default)(app);
   (0, _category2.default)(app);
   (0, _subCategory2.default)(app);
   (0, _menu2.default)(app);
   (0, _charge2.default)(app);
};