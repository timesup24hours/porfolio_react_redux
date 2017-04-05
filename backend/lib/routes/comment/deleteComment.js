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

var _models = require('../../db/models');

var _config = require('../../../config');

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

  app.delete('/api/comment/:id', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var commentId, comment, deletedResult;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commentId = req.params.id;
              comment = null;

              if (commentId) {
                _context.next = 5;
                break;
              }

              res.status(400).json({ error: 'fail to delete' });
              return _context.abrupt('return');

            case 5:
              _context.next = 7;
              return _models.Comment.findById(commentId);

            case 7:
              comment = _context.sent;

              if (comment) {
                _context.next = 11;
                break;
              }

              res.status(400).json({ error: 'comment has been deleted' });
              return _context.abrupt('return');

            case 11:
              if (!(JSON.stringify(req.user._id) !== JSON.stringify(comment.user))) {
                _context.next = 14;
                break;
              }

              res.status(401).json({ error: 'no right to delete' });
              return _context.abrupt('return');

            case 14:
              _context.next = 16;
              return _models.Comment.remove({ _id: commentId });

            case 16:
              deletedResult = _context.sent;

              res.status(202).json({ deletedResult: deletedResult.result.n, commentId: commentId });

            case 18:
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