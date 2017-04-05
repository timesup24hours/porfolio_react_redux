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

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

  app.get('/api/cart', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var cart, idsProducts, cartProducts;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cart = null;

              // get the shopping cart object of the user

              _context.next = 3;
              return _models.Cart.findOne({ user: req.user._id });

            case 3:
              cart = _context.sent;

              if (!(cart === null)) {
                _context.next = 7;
                break;
              }

              res.json({ success: false, cart: [], cartProducts: [] });
              return _context.abrupt('return');

            case 7:

              cart = cart.cart;

              idsProducts = cart.map(function (product) {
                return product.productId;
              });
              _context.next = 11;
              return _models.Product.find({ _id: { $in: idsProducts } });

            case 11:
              cartProducts = _context.sent;

              cartProducts === null ? cartProducts = [] : null;
              res.status(200).json({ success: true, cart: cart, cartProducts: cartProducts });

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