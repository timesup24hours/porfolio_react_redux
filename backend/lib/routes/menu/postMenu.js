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

var ObjectId = require('mongoose').Types.ObjectId; // new ObjectId('58db5e91db917414692734b4')

exports.default = function (app) {

  app.post('/api/test', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var menu;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              menu = new _models.Menu();


              menu.name = 'sleeping bag';
              menu.type = 'subcategory';
              menu.belong = new ObjectId('58db5e91db917414692734b4');

              _context.next = 6;
              return menu.save();

            case 6:

              res.status(201).json({ success: true, menu: menu });

            case 7:
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

  app.put('/api/test', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var menu;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              menu = void 0;
              _context2.next = 3;
              return _models.Menu.update({ _id: "58db5e578cae901454b39b25" }, { $set: { "belong": "58db5e46ffbd69144d24f9a2" } });

            case 3:
              menu = _context2.sent;

              //58db5c1c99daa013fcbe6ace
              res.status(201).json({ success: true, menu: menu });

            case 5:
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
};