'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../../db/models');

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

  app.get('/api/subCategory/:id', (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var subCategory;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              subCategory = null;
              _context.next = 3;
              return _models.SubCategory.find({ type: req.params.id });

            case 3:
              subCategory = _context.sent;

              if (!(subCategory === null)) {
                _context.next = 7;
                break;
              }

              res.status(400).json({ success: false, error: 'no this \'' + req.params.id + '\' type was found' });
              return _context.abrupt('return');

            case 7:

              res.status(200).json({ success: true, subCategory: subCategory });

            case 8:
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

  app.get('/api/subCategory', (0, _util.asyncRequest)(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var subCategory;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              subCategory = null;
              _context2.next = 3;
              return _models.SubCategory.find();

            case 3:
              subCategory = _context2.sent;


              res.status(200).json({ success: true, subCategory: subCategory });

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