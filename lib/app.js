'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _configClass = require('./classes/config.class.js');

var _configClass2 = _interopRequireDefault(_configClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import express from './express.js';
// import socketio from './socketio.js';
// import gulp from './builder/gulp.js';

var dir = _process2.default.cwd();
var mode = 'development';

// var configs = require(path.resolve(dir, 'configs', 'server.json'));

var configs = new _configClass2.default('server');

var port = configs.mods[mode].port || 8080;
var host = configs.mods[mode].host || 'localhost';

var server = require('http').Server(express);

// socketio(server);

// gulp();

server.listen(port, host, function () {
	console.log('server started on ' + host + ':' + port + ' in ' + mode + ' mode');
});