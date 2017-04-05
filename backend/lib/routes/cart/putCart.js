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
   * API: change the quantity of the Product inside of the shopping cart
   * @param {string} req.body.productId - productId of the Product
   * @param {string} req.body.quantity - quantity of the Product
   */
  app.put('/api/cart/changeQuantity', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var _req$body, productId, quantity, cart, idsProduct, cartProducts;

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

              // find the one and update, if not exist then create

              _context.next = 10;
              return _models.Cart.findOneAndUpdate({ user: req.user._id, 'cart.productId': productId }, {
                $set: { 'cart.$.quantity': quantity }
              },
              // safe: true (pass error to callback)
              // upsert: true (create new document if not exist)
              // new: true (return the modified document, instead of the original)
              { safe: true, upsert: true, new: true });

            case 10:
              cart = _context.sent;
              // get the existing cart

              // assign the cart array inside the cart object to the cart variable
              cart = cart.cart;
              // get the all productId from the cart array
              idsProduct = cart.map(function (c) {
                return c.productId;
              });
              // find all the Product object associate with the productId

              _context.next = 15;
              return _models.Product.find({ _id: { $in: idsProduct } });

            case 15:
              cartProducts = _context.sent;


              res.status(200).json({ success: true, cart: cart, cartProducts: cartProducts });

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

  /**********************
   * API: Remove the product from the shopping cart
   * @param {string} productId - productId of the Product object
   */
  app.put('/api/cart/removeProductFromCart', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var productId, cart;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              productId = req.body.productId;

              if (productId) {
                _context2.next = 4;
                break;
              }

              res.status(400).json({ success: false, error: { productId: 'productId is required' } });
              return _context2.abrupt('return');

            case 4:
              cart = null;

              // delete($pull) the product which associate with the productId from the cart array,
              // base on the condition

              _context2.next = 7;
              return _models.Cart.update(
              // condition
              { user: req.user._id, 'cart.productId': productId },
              // update
              {
                $pull: { cart: { productId: productId } }
              },
              // option
              { new: true });

            case 7:
              cart = _context2.sent;

              if (!(cart.nModified === 1)) {
                _context2.next = 13;
                break;
              }

              res.status(200).json({ success: true, productId: productId });
              return _context2.abrupt('return');

            case 13:
              res.status(400).json({ success: false, productId: productId });
              return _context2.abrupt('return');

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }()));

  /**********************
   * API: Decrease one quantity of the product from the shopping cart
   * @param {string} productId - productId of the Product object
   */
  app.put('/api/cart/subtractOneQuantity', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
      var productId, cart, idsProduct, cartProducts;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              productId = req.body.productId;

              if (productId) {
                _context3.next = 4;
                break;
              }

              res.status(400).json({ success: false, error: { productId: 'productId is required' } });
              return _context3.abrupt('return');

            case 4:
              cart = null;

              // find the product inside the cart

              _context3.next = 7;
              return _models.Cart.findOne({ user: req.user._id, 'cart.productId': productId });

            case 7:
              cart = _context3.sent;

              if (!(cart === null)) {
                _context3.next = 11;
                break;
              }

              res.status(400).json({ success: false, error: 'fail to delete, please try again' });
              return _context3.abrupt('return');

            case 11:

              // descrease quantity or filter from the array if quantity is 0
              cart.cart = cart.cart.filter(function (c) {
                if (c.productId === productId) {
                  c.quantity--;
                }
                if (c.quantity > 0) {
                  return c;
                }
              });

              // try to save
              _context3.next = 14;
              return cart.save();

            case 14:

              // get the IDs inside the cart
              idsProduct = cart.cart.map(function (p) {
                return p.productId;
              });
              // get the product object of the IDs from the Product collection

              _context3.next = 17;
              return _models.Product.find({ _id: { $in: idsProduct } });

            case 17:
              cartProducts = _context3.sent;


              /*********************
               * @param {Array{}} cart - { productId: String, quantity: Number }
               * @param {Array{}} cartProducts - Array of Product object
               */
              res.status(200).json({ success: true, cart: cart.cart, cartProducts: cartProducts });

            case 19:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }()));

  /**********************
   * API: Increase one quantity of the product into the shopping cart
   * @param {string} productId - productId of the Product object
   */
  app.put('/api/cart/increaseOneQuantity', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
      var productId, cart, isProductInTheCart, idsOfProduct, cartProducts;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              productId = req.body.productId;

              if (productId) {
                _context4.next = 4;
                break;
              }

              res.status(400).json({ success: false, error: { productId: 'productId is required' } });
              return _context4.abrupt('return');

            case 4:
              cart = null;
              _context4.next = 7;
              return _models.Cart.findOne({ user: req.user._id });

            case 7:
              cart = _context4.sent;

              if (!(cart === null)) {
                _context4.next = 16;
                break;
              }

              cart = new _models.Cart();
              cart.cart = { productId: productId, quantity: 1 };
              cart.user = req.user._id;
              _context4.next = 14;
              return cart.save();

            case 14:
              _context4.next = 21;
              break;

            case 16:
              isProductInTheCart = false;

              // see if any same product in the cart

              cart.cart = cart.cart.map(function (c) {
                if (c.productId === productId) {
                  isProductInTheCart = true;
                  c.quantity++;
                }
                return c;
              });

              // push the new product into array if the product is not in inside the cart
              if (!isProductInTheCart) cart.cart.push({ productId: productId, quantity: 1 });

              _context4.next = 21;
              return cart.save();

            case 21:
              idsOfProduct = cart.cart.map(function (el) {
                return el.productId;
              });
              _context4.next = 24;
              return _models.Product.find({ _id: { $in: idsOfProduct } });

            case 24:
              cartProducts = _context4.sent;

              res.status(200).json({ success: true, cart: cart.cart, cartProducts: cartProducts });

            case 26:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  }()));
};