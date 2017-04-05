'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postComment = require('./postComment');

var _postComment2 = _interopRequireDefault(_postComment);

var _getAllComment = require('./getAllComment');

var _getAllComment2 = _interopRequireDefault(_getAllComment);

var _deleteComment = require('./deleteComment');

var _deleteComment2 = _interopRequireDefault(_deleteComment);

var _putComment = require('./putComment');

var _putComment2 = _interopRequireDefault(_putComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  (0, _postComment2.default)(app);
  (0, _getAllComment2.default)(app);
  (0, _deleteComment2.default)(app);
  (0, _putComment2.default)(app);
};