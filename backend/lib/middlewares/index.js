'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('../../config');

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _util = require('../util');

var _passport3 = require('../auth/passport');

var _passport4 = _interopRequireDefault(_passport3);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* SETUP MIDDLEWARE */
exports.default = function (app) {

  // static files
  if (process.env.NODE_ENV === 'production') {
    app.use(_express2.default.static(_path2.default.join(__dirname, '../../../frontend/build')));
    console.log(_path2.default.join(__dirname, '../../../frontend/build'));
  } else {
    app.use(_express2.default.static(_path2.default.join(__dirname, '../../../frontend/public')));
    console.log(_path2.default.join(__dirname, '../../../frontend/public'));
  }

  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'ejs');
  // app.engine('html', require('ejs').renderFile);

  // setup logging
  if (process.env.NODE_ENV !== 'test') app.use((0, _morgan2.default)('combined', { stream: _util.logger.stream }));
  // setup CORS
  app.use((0, _cors2.default)());
  // add body parsing
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));

  // setup session
  var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
  app.use((0, _expressSession2.default)({
    secret: _config.auth.sessionSecret,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000
    },
    store: new MongoStore({
      mongooseConnection: _mongoose2.default.connection,
      ttl: 14 * 24 * 60 * 60
    }) // store session @ mongodb
  }));
  // setup passport
  app.use(_passport2.default.initialize());
  app.use(_passport2.default.session());
  (0, _passport4.default)(_passport2.default);

  // ENABLE DEBUG WHEN DEV ENVIRONMENT
  if (process.env.NODE_ENV === 'development') {
    _mongoose2.default.set('debug', true);
  }

  // catch all unhandled errors
  app.use(function (err, req, res, next) {
    _util.logger.error('unhandled application error: ', err);
    res.status(500).send(err);
  });
};