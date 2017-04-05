'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

  app.put('/api/category', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var _req$body, field, value, id, childrenId, category;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, field = _req$body.field, value = _req$body.value, id = _req$body.id, childrenId = _req$body.childrenId;

              if (id) {
                _context.next = 4;
                break;
              }

              res.status(400).json({ errors: { id: 'Id is required' } });
              return _context.abrupt('return');

            case 4:
              category = null;

              if (!childrenId) {
                _context.next = 11;
                break;
              }

              _context.next = 8;
              return _models.Category.findOneAndUpdate({ _id: id, "children._id": childrenId }, {
                $set: (0, _defineProperty3.default)({}, field, value)
              }, { new: true });

            case 8:
              category = _context.sent;
              _context.next = 14;
              break;

            case 11:
              _context.next = 13;
              return _models.Category.findOneAndUpdate({ _id: id }, {
                $set: (0, _defineProperty3.default)({}, field, value)
              }, { new: true });

            case 13:
              category = _context.sent;

            case 14:

              res.status(201).json({ success: true, category: category });

            case 15:
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