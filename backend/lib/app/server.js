'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _middlewares = require('../middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

(0, _middlewares2.default)(app);
(0, _routes2.default)(app);

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../../frontend/build', 'index.html'));
});

exports.default = app;