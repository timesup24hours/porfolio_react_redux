'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

var _jwt = require('./jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _models = require('../../db/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passport) {
  // define serialize and deserialize functions
  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id, done) {
      var user;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = null;
              _context.prev = 1;
              _context.next = 4;
              return _models.User.findById(id);

            case 4:
              user = _context.sent;
              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](1);

              done(_context.t0);
              return _context.abrupt('return');

            case 11:
              done(null, user);
              return _context.abrupt('return');

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  (0, _jwt2.default)(passport);
  (0, _local2.default)(passport);
};