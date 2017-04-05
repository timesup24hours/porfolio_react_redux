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

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

  /**********************
   * API: Add the product and quantity into the shopping cart
   * @param {String} req.body.productId - productId of the Product
   * @param {String} req.body.quantity - quantity of the Product
   */
  app.post('/api/cart', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var _req$body, productId, quantity, cart, isProductInTheCart, idsOfProduct, cartProducts;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, productId = _req$body.productId, quantity = _req$body.quantity;

              if (productId) {
                _context.next = 4;
                break;
              }

              res.status(400).json({ success: false, error: { productId: 'productId is required' } });
              return _context.abrupt('return');

            case 4:
              if (quantity) {
                _context.next = 7;
                break;
              }

              res.status(400).json({ success: false, error: { quantity: 'quantity is required' } });
              return _context.abrupt('return');

            case 7:
              cart = null;
              _context.next = 10;
              return _models.Cart.findOne({ user: req.user._id });

            case 10:
              cart = _context.sent;

              if (!(cart === null)) {
                _context.next = 19;
                break;
              }

              cart = new _models.Cart();
              cart.cart = { productId: productId, quantity: quantity };
              cart.user = req.user._id;
              _context.next = 17;
              return cart.save();

            case 17:
              _context.next = 24;
              break;

            case 19:
              isProductInTheCart = false;

              // see if any same product in the cart

              cart.cart = cart.cart.map(function (c) {
                if (c.productId === productId) {
                  isProductInTheCart = true;
                  c.quantity = quantity;
                }
                return c;
              });
              // push the new product into array if the product is not in inside the cart
              if (!isProductInTheCart) cart.cart.push({ productId: productId, quantity: quantity });

              _context.next = 24;
              return cart.save();

            case 24:
              idsOfProduct = cart.cart.map(function (el) {
                return el.productId;
              });
              _context.next = 27;
              return _models.Product.find({ _id: { $in: idsOfProduct } });

            case 27:
              cartProducts = _context.sent;

              res.status(200).json({ success: true, cart: cart.cart, cartProducts: cartProducts });

            case 29:
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