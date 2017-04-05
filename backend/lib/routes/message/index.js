'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postMessage = require('./postMessage');

var _postMessage2 = _interopRequireDefault(_postMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import getAllMessage from './getAllMessage'

exports.default = function (app) {
  (0, _postMessage2.default)(app);
  // getAllMessage(app)
};