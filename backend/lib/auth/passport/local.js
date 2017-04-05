'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passportLocal = require('passport-local');

var _util = require('../../util');

var _models = require('../../db/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passport) {
  // use local-login
  passport.use('local-login', new _passportLocal.Strategy({ usernameField: 'username' }, function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(username, password, done) {
      var user;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // find all users with matching login
              user = null;
              _context.prev = 1;
              _context.next = 4;
              return _models.User.findOne({ 'local.username': username });

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

              done(null, false, { error: 'username doesn\'t exist!' });
              return _context.abrupt('return');

            case 14:
              if (!(user.local.password !== (0, _util.hash)(password))) {
                _context.next = 17;
                break;
              }

              done(null, false, { error: 'Password must be match!' });
              return _context.abrupt('return');

            case 17:

              user.local.password = undefined;
              // delete user.local.password // couldn't delete the property, maybe because it inherits from somewhere

              done(null, user);
              return _context.abrupt('return');

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 7]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()));

  // use local-signup
  passport.use('local-signup', new _passportLocal.Strategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true }, function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, username, password, done) {
      var user, newUser;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              user = null;
              _context2.prev = 1;
              _context2.next = 4;
              return _models.User.findOne({ 'local.username': username });

            case 4:
              user = _context2.sent;
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](1);

              done(null, false, { error: 'Missing credential!' });

            case 10:
              if (!user) {
                _context2.next = 13;
                break;
              }

              done(null, false, { error: 'This username is already taken!' });
              return _context2.abrupt('return');

            case 13:
              newUser = new _models.User();

              newUser.local.username = username;
              newUser.local.password = (0, _util.hash)(password);

              _context2.prev = 16;
              _context2.next = 19;
              return newUser.save();

            case 19:
              _context2.next = 25;
              break;

            case 21:
              _context2.prev = 21;
              _context2.t1 = _context2['catch'](16);

              done(_context2.t1, false, { error: 'fail to save' });
              return _context2.abrupt('return');

            case 25:

              newUser.local.password = undefined;

              done(null, newUser);
              return _context2.abrupt('return');

            case 28:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[1, 7], [16, 21]]);
    }));

    return function (_x4, _x5, _x6, _x7) {
      return _ref2.apply(this, arguments);
    };
  }()));
};