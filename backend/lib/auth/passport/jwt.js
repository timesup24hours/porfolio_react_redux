'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passportJwt = require('passport-jwt');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../../config');

var _models = require('../../db/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtOpts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('x-access-token'),
  secretOrKey: _config.auth.jwtSecret
};

exports.default = function (passport) {

  // use JWTStrategy
  passport.use('local-jwt', new _passportJwt.Strategy(jwtOpts, function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(payload, done) {
      var user;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = null;
              _context.prev = 1;
              _context.next = 4;
              return _models.User.findById(payload._doc._id);

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
              if (user) {
                _context.next = 14;
                break;
              }

              done(null, false);
              return _context.abrupt('return');

            case 14:

              user.local.password = undefined;

              // return user if successful
              done(null, user);
              return _context.abrupt('return');

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()));
};