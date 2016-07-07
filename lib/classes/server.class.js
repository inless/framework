'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _loggerClass = require('./logger.class.js');

var _loggerClass2 = _interopRequireDefault(_loggerClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var console = new _loggerClass2.default('inless.server');

var Server = function () {
	function Server() {
		var express = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		_classCallCheck(this, Server);

		this.server = _http2.default.Server(express);
	}

	_createClass(Server, [{
		key: 'start',
		value: function start() {
			var host = arguments.length <= 0 || arguments[0] === undefined ? '0.0.0.0' : arguments[0];
			var port = arguments.length <= 1 || arguments[1] === undefined ? 80 : arguments[1];

			try {
				this.server.listen(port, host, function () {
					console.log(_colors2.default.bold('Server started on ' + host + ':' + port));
				});
			} catch (error) {
				console.error(error.toString());
			}
		}
	}]);

	return Server;
}();

exports.default = Server;