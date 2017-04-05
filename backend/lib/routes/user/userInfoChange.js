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

var _config = require('../../../config');

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

  app.put('/api/userInfoChange', _passport2.default.authenticate('local-jwt'), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
      var _req$body, nickname, email, street, city, state, zipcode, cellphone, homephone, workphone, user, token;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.user) {
                _context.next = 3;
                break;
              }

              res.status(401).send({ error: 'Need to be login!' });
              return _context.abrupt('return');

            case 3:
              _req$body = req.body, nickname = _req$body.nickname, email = _req$body.email, street = _req$body.street, city = _req$body.city, state = _req$body.state, zipcode = _req$body.zipcode, cellphone = _req$body.cellphone, homephone = _req$body.homephone, workphone = _req$body.workphone;
              user = null;
              _context.next = 7;
              return _models.User.findOne({ _id: req.user._id });

            case 7:
              user = _context.sent;

              if (user) {
                _context.next = 11;
                break;
              }

              res.status(400).send({ error: 'user has been deleted!' });
              return _context.abrupt('return');

            case 11:

              user.local.nickname = nickname;
              user.email = email;
              user.address.street = street;
              user.address.city = city;
              user.address.zipcode = zipcode;
              user.address.state = state;
              user.contact.cellphone = cellphone;
              user.contact.homephone = homephone;
              user.contact.workphone = workphone;

              _context.next = 22;
              return user.save();

            case 22:

              user.local.password = undefined;

              token = _jsonwebtoken2.default.sign(user, _config.auth.jwtSecret);


              res.status(201).json({ user: user, token: token });

            case 25:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()));
};