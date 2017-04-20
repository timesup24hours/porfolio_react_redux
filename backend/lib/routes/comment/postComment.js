'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../../db/models');

var _config = require('../../../config');

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

  app.post('/api/comment', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var comment, reviews;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.body.comment) {
                _context.next = 3;
                break;
              }

              res.status(400).send({ errors: { comment: 'Comment is required!' } });
              return _context.abrupt('return');

            case 3:
              comment = null;


              comment = new _models.Comment();

              comment.comment = req.body.comment;
              comment.user = req.user._id;
              if (req.body.productId) comment.productId = req.body.productId;

              _context.next = 10;
              return comment.save();

            case 10:
              _context.next = 12;
              return _models.Comment.findOne({ _id: comment._id }).populate('user', '_id local.username local.nickname');

            case 12:
              reviews = _context.sent;


              res.status(201).json({ success: true, comment: reviews });

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()));
};