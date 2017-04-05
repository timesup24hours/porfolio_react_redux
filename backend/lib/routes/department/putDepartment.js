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

  app.put('/api/department', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var _req$body, id, name, categoryId, department;

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
              department = null;
              _context.next = 7;
              return _models.Department.findOne({ _id: id });

            case 7:
              department = _context.sent;


              if (name) department.name = name;
              if (categoryId) department.categoryId = categoryId;

              _context.next = 12;
              return department.save();

            case 12:

              res.status(201).json({ success: true, department: department });

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

  app.put('/api/department_edit', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var _req$body2, id, name, categoryId, department;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, id = _req$body2.id, name = _req$body2.name, categoryId = _req$body2.categoryId;

              // if(!id) {
              //   res.status(400).json({ error: { id: 'id is required' } })
              //   return
              // }

              department = null;
              _context2.next = 4;
              return _models.Department.findOneAndUpdate({ _id: '58da166f1903e9d353b7a909' }, {
                $push: {
                  categoryId: "58db1b1d6d675f0e398766c3"
                }
              }, { upsert: true, new: true });

            case 4:
              department = _context2.sent;


              // if(name) department.name = name
              // if(categoryId) department.categoryId = categoryId

              // await department.save()

              res.status(201).json({ success: true, department: department });

            case 6:
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