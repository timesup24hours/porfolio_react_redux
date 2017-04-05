'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncRequest = undefined;

var _logger = require('./logger');

var asyncRequest = exports.asyncRequest = function asyncRequest(handler) {
  return function (req, res, next) {
    return handler(req, res, next).catch(function (e) {
      _logger.logger.debug('Error during request:', e);
      res.status(400).send({ error: e.toString() });
    });
  };
};