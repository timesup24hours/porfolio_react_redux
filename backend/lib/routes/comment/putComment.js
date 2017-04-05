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

  app.put('/api/comment', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var comment;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.body.id) {
                _context.next = 3;
                break;
              }

              res.send({ errors: { id: 'Id is required!' } });
              return _context.abrupt('return');

            case 3:
              if (req.body.comment) {
                _context.next = 6;
                break;
              }

              res.send({ errors: { comment: 'Comment is required!' } });
              return _context.abrupt('return');

            case 6:
              comment = null;
              _context.next = 9;
              return _models.Comment.findOne({ _id: req.body.id }).populate('user', '_id local.username');

            case 9:
              comment = _context.sent;

              if (!(JSON.stringify(comment.user._id) !== JSON.stringify(req.user._id))) {
                _context.next = 13;
                break;
              }

              res.send({ errors: { auth: 'You have no right to change this comment!' } });
              return _context.abrupt('return');

            case 13:

              comment.comment = req.body.comment;

              _context.next = 16;
              return comment.save();

            case 16:

              res.status(201).json({ success: true, comment: comment });

            case 17:
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