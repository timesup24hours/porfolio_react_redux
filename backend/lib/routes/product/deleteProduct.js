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

  app.put('/api/delete_product', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var productId, product;
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
              return _models.Product.findOne({ _id: productId, deleted: { $ne: true } });

            case 6:
              product = _context.sent;

              if (product) {
                _context.next = 10;
                break;
              }

              res.status(400).json({ success: true, error: 'no such product' });
              return _context.abrupt('return');

            case 10:
              if (!(JSON.stringify(product.owner) !== JSON.stringify(req.user._id))) {
                _context.next = 13;
                break;
              }

              res.status(400).json({ success: true, error: 'no right to delete' });
              return _context.abrupt('return');

            case 13:

              product.deleted = true;

              _context.next = 16;
              return product.save();

            case 16:

              // const deletedResult = await Product.remove({ _id: productId })
              //
              // if(deletedResult.result.n !== 1) {
              //   res.status(400).json({ error: 'fail to delete, could not find the product' })
              //   return
              // }

              res.status(202).json({ success: true, product: product });
              return _context.abrupt('return');

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