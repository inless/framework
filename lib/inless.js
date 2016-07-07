'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Starter = exports.Logger = exports.Config = undefined;

var _configClass = require('./classes/config.class.js');

var _configClass2 = _interopRequireDefault(_configClass);

var _loggerClass = require('./classes/logger.class.js');

var _loggerClass2 = _interopRequireDefault(_loggerClass);

var _starterClass = require('./classes/starter.class.js');

var _starterClass2 = _interopRequireDefault(_starterClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Config = _configClass2.default;
exports.Logger = _loggerClass2.default;
exports.Starter = _starterClass2.default;

// import express from './express.js';
// import socketio from './socketio.js';
// import gulp from './builder/gulp.js';

// var configs = require(path.resolve(dir, 'configs', 'server.json'));

// let port = configs.mods[mode].port || 8080;
// let host = configs.mods[mode].host || 'localhost';

// let server = require('http').Server(express);

// socketio(server);

// gulp();