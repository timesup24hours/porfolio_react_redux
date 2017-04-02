require('babel-core/register');
require("babel-polyfill")
process.env.NODE_ENV = 'test';
require('./test.js');
