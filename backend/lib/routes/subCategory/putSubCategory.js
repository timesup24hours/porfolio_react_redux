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

  app.put('/api/subCategory', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var _req$body, id, name, categoryId, subCategory;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, id = _req$body.id, name = _req$body.name, categoryId = _req$body.categoryId;

              if (id) {
                _context.next = 4;
                break;
              }

              res.status(400).json({ error: { id: 'id is required' } });
              return _context.abrupt('return');

            case 4:
              subCategory = null;
              _context.next = 7;
              return _models.SubCategory.findOne({ _id: id });

            case 7:
              subCategory = _context.sent;


              if (name) subCategory.name = name;
              if (categoryId) subCategory.categoryId = categoryId;

              _context.next = 12;
              return subCategory.save();

            case 12:

              res.status(201).json({ success: true, subCategory: subCategory });

            case 13:
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