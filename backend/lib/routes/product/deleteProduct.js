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

  app.delete('/api/product', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var productId, deletedResult;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              productId = req.body.id;

              if (productId) {
                _context.next = 4;
                break;
              }

              res.status(400).json({ error: 'product id is required' });
              return _context.abrupt('return');

            case 4:
              _context.next = 6;
              return _models.Product.remove({ _id: productId });

            case 6:
              deletedResult = _context.sent;

              if (!(deletedResult.result.n !== 1)) {
                _context.next = 10;
                break;
              }

              res.status(400).json({ error: 'fail to delete, could not find the product' });
              return _context.abrupt('return');

            case 10:

              res.status(202).json({ success: true, productId: productId });
              return _context.abrupt('return');

            case 12:
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