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

var _schemaInspector = require('schema-inspector');

var _schemaInspector2 = _interopRequireDefault(_schemaInspector);

var _util = require('../../util');

var _user = require('../../db/models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

  app.post('/api/signup', function (req, res, next) {
    if (validateSignupBody(req.body).error.length > 0) {
      return res.status(400).json({ error: 'validation fail' });
    }

    _passport2.default.authenticate('local-signup', function (err, user, error) {
      if (err) res.status(500).json(err);
      if (user) res.status(201).json({ message: 'Sign up successful!', username: user.local.username });
      if (error && error.message) res.status(400).json(error.message);
      if (error && error.error) res.status(409).json(error.error);
    })(req, res, next);
  });

  app.post('/api/isUserExist', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var error, users;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              error = {
                username: ''
              };

              if (req.body.username) {
                _context.next = 4;
                break;
              }

              res.json({ err: 'Username is required' });
              return _context.abrupt('return');

            case 4:
              _context.next = 6;
              return _user2.default.findOne({ 'local.username': req.body.username });

            case 6:
              users = _context.sent;

              if (users) {
                _context.next = 10;
                break;
              }

              res.status(200).json({ success: 'Username is available' });
              return _context.abrupt('return');

            case 10:

              if (users.local.username === req.body.username) {
                error.username = 'Username is taken';
              }

              if (!(error.username === '')) {
                _context.next = 14;
                break;
              }

              res.status(200).json({ success: 'Username is available' });
              return _context.abrupt('return');

            case 14:

              res.json(error);
              return _context.abrupt('return');

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
};

function validateSignupBody(body) {
  var validation = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        pattern: /^[0-9a-z_]{1,20}$/
      },
      password: {
        type: 'string',
        minLength: 2,
        eq: body.passwordConfirm
      },
      passwordConfirm: {
        type: 'string',
        minLength: 2,
        eq: body.password
      }
    }
  };

  return _schemaInspector2.default.validate(validation, body);
}