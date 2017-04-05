"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require("./server");

var _server2 = _interopRequireDefault(_server);

var _db = require("../db");

var _config = require("../../config");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");
require("babel-polyfill");

_server2.default.set('port', process.env.PORT || _config.server.PORT);
_db.mongoose.connect(process.env.DB_HOST || _config.db.host);
var db = _db.mongoose.connection;
db.on('error', function () {
  return _util.logger.error('Failing to connect db!!!!!');
});
db.once('open', function () {
  _util.logger.info('Connected to mongodb server');
  _util.logger.info('Connected to mongodb name: ', _db.mongoose.connection.name);
  _server2.default.listen(_server2.default.get('port'), function (err) {
    _util.logger.info('Express server is up on port ' + _server2.default.get('port'));
  });
});

// output all uncaught exceptions
process.on('uncaughtException', function (err) {
  return _util.logger.error('uncaught exception:', err);
});
process.on('unhandledRejection', function (error) {
  return _util.logger.error('unhandled rejection:', error);
});

exports.default = _server2.default;