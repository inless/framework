'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _configClass = require('./config.class.js');

var _configClass2 = _interopRequireDefault(_configClass);

var _loggerClass = require('./logger.class.js');

var _loggerClass2 = _interopRequireDefault(_loggerClass);

var _serverClass = require('./server.class.js');

var _serverClass2 = _interopRequireDefault(_serverClass);

var _expressClass = require('./express.class.js');

var _expressClass2 = _interopRequireDefault(_expressClass);

var _routerClass = require('./router.class.js');

var _routerClass2 = _interopRequireDefault(_routerClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Starter = function Starter() {
	_classCallCheck(this, Starter);

	var config = new _configClass2.default('server');
	var console = new _loggerClass2.default('inless', config.get('logLevel'));
	var rotuer = new _routerClass2.default();
	var express = new _expressClass2.default();
	express.setMiddleware(router.getMiddleware());
	var server = new _serverClass2.default(express.getEngine());
	server.start(config.get('host'), config.get('port'));
	console.log(_colors2.default.bold('inless started.'));
};

exports.default = Starter;