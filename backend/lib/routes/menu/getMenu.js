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

  // app.get('/api/test', asyncRequest(async (req, res, next) => {
  //
  //   let menu = await Menu.find().populate(
  //     {
  //        path: 'children',
  //          populate: {
  //          path: 'children',
  //        }
  //   }).where('type').equals('department')
  //
  //   res.status(200).json({ success: true, menu })
  // }))

  app.get('/api/test', (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var menu;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _models.Menu.find();

            case 2:
              menu = _context.sent;

              // .populate(
              //     {
              //        path: 'belong',
              //          populate: {
              //          path: 'belong',
              //        }
              //   }).where('type').equals('subcategory')

              res.status(200).json({ success: true, menu: menu });

            case 4:
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