'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

  app.post('/api/login', _passport2.default.authenticate('local-login'), function (req, res) {
    if (req.user) {
      var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwtSecret);
      res.status(200).json({ user: req.user, token: token });
    } else {
      res.status(401).json({ error: 'Error logging in!' });
    }
  });
};