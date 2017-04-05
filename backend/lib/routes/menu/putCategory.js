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

  app.put('/api/category', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var _req$body, id, name, desc, departmentId, subCategoryId, category;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, id = _req$body.id, name = _req$body.name, desc = _req$body.desc, departmentId = _req$body.departmentId, subCategoryId = _req$body.subCategoryId;

              if (id) {
                _context.next = 4;
                break;
              }

              res.status(400).json({ error: { id: 'id is required' } });
              return _context.abrupt('return');

            case 4:
              category = null;
              _context.next = 7;
              return _models.Category.findOneAndUpdate({ _id: id }, { $set: { "departmentId": departmentId } });

            case 7:
              category = _context.sent;


              // if(name) category.name = name
              // if(desc) category.desc = desc
              // if(departmentId) category.departmentId
              // if(subCategoryId) category.subCategoryId.push(subCategoryId)
              //
              // await category.save()

              res.status(201).json({ success: true, category: category });

            case 9:
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