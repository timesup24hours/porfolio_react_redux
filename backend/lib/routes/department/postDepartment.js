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

  app.post('/api/department', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var _req$body, name, desc, categoryId, department, menu;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, desc = _req$body.desc, categoryId = _req$body.categoryId;

              if (name) {
                _context.next = 4;
                break;
              }

              res.status(400).json({ errors: { name: 'name is required' } });
              return _context.abrupt('return');

            case 4:
              department = null;


              department = new _models.Department();

              department.name = unescape(name);
              department.to = (0, _util.routeNameFormatToLink)(unescape(name));
              if (desc) department.desc = desc;

              _context.next = 11;
              return department.save();

            case 11:
              _context.next = 13;
              return (0, _util.getMenu)();

            case 13:
              menu = _context.sent;


              res.status(201).json({ success: true, menu: menu });

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