'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _configClass = require('./config.class.js');

var _configClass2 = _interopRequireDefault(_configClass);

var _loggerClass = require('./logger.class.js');

var _loggerClass2 = _interopRequireDefault(_loggerClass);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cookieSession = require('cookie-session');

var _cookieSession2 = _interopRequireDefault(_cookieSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var console = new _loggerClass2.default('express');

var tmp_secret = new Array(10).fill(null).reduce(function (a, b) {
	return '' + (a || '') + (Math.random() * 1e8 | 0).toString(32);
});

var Express = function () {
	function Express() {
		_classCallCheck(this, Express);

		var dir = _process2.default.cwd();
		var config = new _configClass2.default('server');
		this.session = (0, _cookieSession2.default)({
			httpOnly: true,
			signed: true,
			name: config.get('session.name', 'sid'),
			keys: [config.get('session.secret', tmp_secret)]
		});
		var app = (0, _express2.default)();
		app.set('x-powered-by', 'inless');
		app.use(_bodyParser2.default.json());
		app.use(_bodyParser2.default.urlencoded({
			extended: true
		}));
		app.use((0, _multer2.default)({
			storage: _path2.default.resolve(dir, config.get('tempDir', './tmp'))
		}).any());
		app.use((0, _cookieParser2.default)());
		app.use(this.session);
		app.use(function (req, res, next) {
			if (!req.session) {
				req.session = {
					account: {
						title: 'anonymous',
						level: 'any',
						id: null
					}
				};
			}
			next();
		});
		app.use(function (req, res, next) {
			console.info('[' + _colors2.default.grey(_lodash2.default.result(req, 'session.account.title', 'anonymous')) + '] ' + _colors2.default.cyan(req.url));
			next();
		});
		app.use(_express2.default.static(_path2.default.resolve(dir, 'static/bundles')));
		app.use(_express2.default.static(_path2.default.resolve(dir, 'static/build')));
		app.use(_express2.default.static(_path2.default.resolve(dir, 'static/public')));
		this.app = app;
	}

	_createClass(Express, [{
		key: 'setMiddleware',
		value: function setMiddleware() {
			var middleware = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

			if (middleware) {
				this.app.use(middleware);
			}
		}
	}, {
		key: 'getEngine',
		value: function getEngine() {
			return this.app;
		}
	}]);

	return Express;
}();

exports.default = Express;