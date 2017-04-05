'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _signup = require('./signup');

var _signup2 = _interopRequireDefault(_signup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  (0, _login2.default)(app), (0, _signup2.default)(app);
};