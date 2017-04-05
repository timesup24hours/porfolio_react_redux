'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getMenu = require('./getMenu');

var _getMenu2 = _interopRequireDefault(_getMenu);

var _postMenu = require('./postMenu');

var _postMenu2 = _interopRequireDefault(_postMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import putCategory from './putCategory'

exports.default = function (app) {
  (0, _getMenu2.default)(app);
  (0, _postMenu2.default)(app);
  // putCategory(app)
};